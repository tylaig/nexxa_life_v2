-- Migration 004: Perfil do usuário no app
-- Extende auth.users com campos específicos do NexxaLife
-- (sem tenant_id / workspace_id — produto é single-user)

create table if not exists app_user_profiles (
  user_id          uuid        primary key references auth.users(id) on delete cascade,
  email            text        not null,
  full_name        text        not null,
  nickname         text,
  phone            text,
  avatar_url       text,

  -- Onboarding
  onboarded        boolean     not null default false,
  onboarding_step  text        not null default 'welcome'
                               check (onboarding_step in ('welcome', 'profile', 'diagnostic', 'goals', 'complete')),

  -- Preferências do ciclo
  preferred_wake_time  time    default '07:00',
  preferred_sleep_time time    default '23:00',
  focus_areas      text[]      not null default '{}',  -- áreas prioritárias: ['saúde','trabalho',...]

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- RLS
alter table app_user_profiles enable row level security;

create policy "users_manage_own_profile"
  on app_user_profiles for all
  using (auth.uid() = user_id);

-- Trigger updated_at
create trigger app_user_profiles_updated_at
  before update on app_user_profiles
  for each row execute function update_updated_at();

-- Índice para busca por email
create index if not exists profiles_email_idx on app_user_profiles(email);

-- Função: cria perfil automaticamente quando novo usuário se registra
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.app_user_profiles (user_id, email, full_name, nickname)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'nickname'
  )
  on conflict (user_id) do nothing;

  insert into public.onboarding_state (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

-- Trigger: dispara ao criar usuário no Supabase Auth
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

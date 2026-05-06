-- Migration 004: Perfil do usuário no app
-- Depende de: 001_bootstrap.sql, 002_auth_support.sql
-- NOTA: sem tenant_id / workspace_id — produto é single-user

create table if not exists public.app_user_profiles (
  user_id              uuid        primary key references auth.users(id) on delete cascade,
  email                text        not null,
  full_name            text        not null,
  nickname             text,
  phone                text,
  avatar_url           text,

  -- Status de onboarding
  onboarded            boolean     not null default false,
  onboarding_step      text        not null default 'welcome'
                                   check (onboarding_step in ('welcome', 'profile', 'diagnostic', 'goals', 'complete')),

  -- Preferências do ciclo pessoal
  preferred_wake_time  time        default '07:00',
  preferred_sleep_time time        default '23:00',
  focus_areas          text[]      not null default '{}',

  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- RLS
alter table public.app_user_profiles enable row level security;

create policy "users_manage_own_profile"
  on public.app_user_profiles for all
  using (auth.uid() = user_id);

-- Índice de suporte
create index if not exists profiles_email_idx
  on public.app_user_profiles(email);

-- Trigger updated_at
create trigger app_user_profiles_updated_at
  before update on public.app_user_profiles
  for each row execute function public.update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Função: criação automática do perfil ao registrar novo usuário
-- Disparada via trigger em auth.users
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Cria perfil
  insert into public.app_user_profiles (user_id, email, full_name, nickname)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.email, ''),
    new.raw_user_meta_data->>'nickname'
  )
  on conflict (user_id) do nothing;

  -- Cria estado de onboarding
  insert into public.onboarding_state (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  -- Cria configurações padrão
  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

-- Trigger: dispara após INSERT em auth.users (novo cadastro)
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

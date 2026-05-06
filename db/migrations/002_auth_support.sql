-- Migration 002: Auth support — onboarding_state e user_settings
-- Depende de: 001_bootstrap.sql

create table if not exists public.onboarding_state (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  current_step  text        not null default 'welcome'
                            check (current_step in ('welcome', 'profile', 'diagnostic', 'goals', 'complete')),
  completed     boolean     not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.user_settings (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  theme         text        not null default 'system'
                            check (theme in ('light', 'dark', 'system')),
  locale        text        not null default 'pt-BR',
  timezone      text        not null default 'America/Sao_Paulo',
  notifications boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id)
);

-- RLS
alter table public.onboarding_state enable row level security;
alter table public.user_settings    enable row level security;

create policy "users_manage_own_onboarding"
  on public.onboarding_state for all
  using (auth.uid() = user_id);

create policy "users_manage_own_settings"
  on public.user_settings for all
  using (auth.uid() = user_id);

-- Triggers updated_at
create trigger onboarding_state_updated_at
  before update on public.onboarding_state
  for each row execute function public.update_updated_at();

create trigger user_settings_updated_at
  before update on public.user_settings
  for each row execute function public.update_updated_at();

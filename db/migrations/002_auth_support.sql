-- Migration 002: Auth — tabelas de suporte à autenticação
-- Complementa o sistema de auth do Supabase (auth.users já existe via Supabase)

-- Tabela de sessões de onboarding (rastrear etapas completadas)
create table if not exists onboarding_state (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade unique,
  current_step  text        not null default 'welcome'
                            check (current_step in ('welcome', 'profile', 'diagnostic', 'goals', 'complete')),
  completed     boolean     not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Tabela de configurações globais do usuário
create table if not exists user_settings (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references auth.users(id) on delete cascade unique,
  theme           text        not null default 'system' check (theme in ('light', 'dark', 'system')),
  locale          text        not null default 'pt-BR',
  timezone        text        not null default 'America/Sao_Paulo',
  notifications   boolean     not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- RLS
alter table onboarding_state  enable row level security;
alter table user_settings     enable row level security;

create policy "users_manage_own_onboarding"
  on onboarding_state for all
  using (auth.uid() = user_id);

create policy "users_manage_own_settings"
  on user_settings for all
  using (auth.uid() = user_id);

-- Triggers
create trigger onboarding_state_updated_at
  before update on onboarding_state
  for each row execute function update_updated_at();

create trigger user_settings_updated_at
  before update on user_settings
  for each row execute function update_updated_at();

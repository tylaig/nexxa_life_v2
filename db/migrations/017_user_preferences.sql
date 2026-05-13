-- Migration 017: User preferences and connected settings core
-- Depends on: 001_bootstrap.sql

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'dark' check (theme in ('dark', 'light', 'system')),
  timezone text not null default 'America/Sao_Paulo',
  date_format text not null default 'DD/MM/YYYY',
  week_starts_on integer not null default 1 check (week_starts_on between 0 and 6),
  language text not null default 'pt-BR',

  daily_summary_enabled boolean not null default true,
  daily_summary_time time not null default '07:00',
  goal_reminders_enabled boolean not null default true,
  event_reminders_enabled boolean not null default true,
  sound_enabled boolean not null default true,
  reduce_motion boolean not null default false,

  cycle_default_area text check (cycle_default_area is null or cycle_default_area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  cycle_review_day integer not null default 1 check (cycle_review_day between 0 and 6),
  cycle_auto_score_enabled boolean not null default true,
  cycle_auto_plan_enabled boolean not null default true,
  checklist_grouping text not null default 'goal' check (checklist_grouping in ('goal', 'priority', 'area', 'manual')),

  calendar_provider text check (calendar_provider is null or calendar_provider in ('google', 'outlook', 'apple', 'other')),
  calendar_sync_enabled boolean not null default false,
  calendar_sync_direction text not null default 'two_way' check (calendar_sync_direction in ('import_only', 'export_only', 'two_way')),
  calendar_default_id text,
  calendar_conflict_strategy text not null default 'ask' check (calendar_conflict_strategy in ('ask', 'prefer_nexxa', 'prefer_external')),

  ai_proactivity text not null default 'balanced' check (ai_proactivity in ('low', 'balanced', 'high')),
  ai_context_memory_enabled boolean not null default true,
  ai_auto_create_tasks boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "users_manage_own_preferences"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger user_preferences_updated_at
  before update on public.user_preferences
  for each row execute function public.update_updated_at();

create or replace function public.ensure_user_preferences(target_user_id uuid)
returns public.user_preferences
language plpgsql
security definer
set search_path = public
as $$
declare
  prefs public.user_preferences;
begin
  insert into public.user_preferences (user_id)
  values (target_user_id)
  on conflict (user_id) do nothing;

  select * into prefs
  from public.user_preferences
  where user_id = target_user_id;

  return prefs;
end;
$$;

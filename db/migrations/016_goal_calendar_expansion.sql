-- Migration 016: Goal events and future Google Calendar readiness
-- Depends on: 007_agenda.sql, 015_interconnected_cycle.sql

alter table public.agenda_events
  add column if not exists recurrence_rule text,
  add column if not exists recurrence_until date,
  add column if not exists timezone text not null default 'America/Sao_Paulo',
  add column if not exists external_calendar_provider text check (external_calendar_provider is null or external_calendar_provider in ('google', 'outlook', 'apple', 'other')),
  add column if not exists external_calendar_id text,
  add column if not exists external_event_id text,
  add column if not exists sync_status text not null default 'local_only' check (sync_status in ('local_only', 'pending_sync', 'synced', 'sync_error', 'detached')),
  add column if not exists last_synced_at timestamptz,
  add column if not exists sync_error text;

create index if not exists agenda_external_google_idx
  on public.agenda_events(user_id, external_calendar_provider, external_event_id);

create index if not exists agenda_goal_recurrence_idx
  on public.agenda_events(user_id, goal_id, recurrence, event_date);

create or replace view public.v_goal_calendar_events as
select
  ae.*,
  g.title as goal_title,
  g.category as goal_category,
  m.title as mission_title,
  m.type as mission_type,
  case
    when ae.external_calendar_provider is not null and ae.external_event_id is not null then true
    else false
  end as has_external_calendar_link
from public.agenda_events ae
left join public.goals g on g.id = ae.goal_id and g.user_id = ae.user_id
left join public.missions m on m.id = ae.mission_id and m.user_id = ae.user_id;

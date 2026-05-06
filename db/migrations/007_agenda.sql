-- Migration 007: Agenda (eventos)

create table if not exists agenda_events (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null,
  event_date  date        not null,
  start_time  time        not null,
  end_time    time        not null,
  type        text        not null default 'personal'
                          check (type in ('focus', 'meeting', 'personal', 'health')),
  location    text,
  is_online   boolean     not null default false,
  recurrence  text        not null default 'none'
                          check (recurrence in ('none', 'daily', 'weekly', 'monthly')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table agenda_events enable row level security;

create policy "users_manage_own_events"
  on agenda_events for all
  using (auth.uid() = user_id);

create index if not exists events_user_date_idx
  on agenda_events(user_id, event_date);

create trigger events_updated_at
  before update on agenda_events
  for each row execute function update_updated_at();

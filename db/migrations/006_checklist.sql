-- Migration 006: Checklist diário
-- Depende de: 001_bootstrap.sql

create table if not exists public.checklist_items (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  label      text        not null,
  done       boolean     not null default false,
  priority   text        not null default 'medium'
                         check (priority in ('high', 'medium', 'low')),
  category   text        not null default 'Geral',
  recurrent  boolean     not null default false,
  item_date  date        not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.checklist_items enable row level security;

create policy "users_manage_own_checklist"
  on public.checklist_items for all
  using (auth.uid() = user_id);

create index if not exists checklist_user_date_idx
  on public.checklist_items(user_id, item_date);

create trigger checklist_updated_at
  before update on public.checklist_items
  for each row execute function public.update_updated_at();

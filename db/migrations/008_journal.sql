-- Migration 008: Diário (journal)
-- Depende de: 001_bootstrap.sql

create table if not exists public.journal_entries (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  content     text        not null,
  mood        text        check (mood in ('great', 'good', 'neutral', 'bad', 'awful')),
  tags        text[]      not null default '{}',
  entry_date  date        not null default current_date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.journal_entries enable row level security;

create policy "users_manage_own_journal"
  on public.journal_entries for all
  using (auth.uid() = user_id);

-- Índice por data (listagem de entradas)
create index if not exists journal_user_date_idx
  on public.journal_entries(user_id, entry_date desc);

-- Full-text search em português
create index if not exists journal_content_fts_idx
  on public.journal_entries
  using gin(to_tsvector('portuguese', content));

create trigger journal_updated_at
  before update on public.journal_entries
  for each row execute function public.update_updated_at();

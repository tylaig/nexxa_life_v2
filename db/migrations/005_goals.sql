-- Migration 005: Goals (Metas)
-- Depende de: 001_bootstrap.sql

create table if not exists public.goals (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null,
  description text,
  progress    integer     not null default 0 check (progress between 0 and 100),
  category    text        not null default 'Pessoal',
  status      text        not null default 'active'
                          check (status in ('active', 'completed', 'paused')),
  target_date date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.goal_milestones (
  id         uuid    primary key default gen_random_uuid(),
  goal_id    uuid    not null references public.goals(id) on delete cascade,
  label      text    not null,
  done       boolean not null default false,
  sort_order integer not null default 0
);

-- RLS
alter table public.goals           enable row level security;
alter table public.goal_milestones enable row level security;

create policy "users_manage_own_goals"
  on public.goals for all
  using (auth.uid() = user_id);

create policy "users_manage_own_milestones"
  on public.goal_milestones for all
  using (
    exists (
      select 1 from public.goals g
      where g.id = goal_id
        and g.user_id = auth.uid()
    )
  );

-- Índices
create index if not exists goals_user_id_idx   on public.goals(user_id);
create index if not exists goals_status_idx    on public.goals(user_id, status);
create index if not exists milestones_goal_idx on public.goal_milestones(goal_id);

-- Trigger updated_at (usa função criada na 001)
create trigger goals_updated_at
  before update on public.goals
  for each row execute function public.update_updated_at();

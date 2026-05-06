-- Migration 005: Goals (Metas)
-- Tabelas para o módulo de metas do ciclo NexxaLife

create table if not exists goals (
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

create table if not exists goal_milestones (
  id         uuid    primary key default gen_random_uuid(),
  goal_id    uuid    not null references goals(id) on delete cascade,
  label      text    not null,
  done       boolean not null default false,
  sort_order integer not null default 0
);

-- RLS
alter table goals            enable row level security;
alter table goal_milestones  enable row level security;

create policy "users_manage_own_goals"
  on goals for all
  using (auth.uid() = user_id);

create policy "users_manage_own_milestones"
  on goal_milestones for all
  using (
    exists (select 1 from goals g where g.id = goal_id and g.user_id = auth.uid())
  );

-- Índices
create index if not exists goals_user_id_idx    on goals(user_id);
create index if not exists goals_status_idx     on goals(user_id, status);
create index if not exists milestones_goal_idx  on goal_milestones(goal_id);

-- Auto-atualiza updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger goals_updated_at
  before update on goals
  for each row execute function update_updated_at();

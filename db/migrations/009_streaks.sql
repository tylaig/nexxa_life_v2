-- Migration 009: Streaks e log de atividade diária

-- Tabela de streak do usuário (uma linha por usuário)
create table if not exists user_streaks (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references auth.users(id) on delete cascade unique,
  current_streak  integer     not null default 0,
  longest_streak  integer     not null default 0,
  last_active_date date,
  updated_at      timestamptz not null default now()
);

-- Log de atividade por dia (uma linha por usuário/dia)
create table if not exists daily_activity_log (
  id               uuid    primary key default gen_random_uuid(),
  user_id          uuid    not null references auth.users(id) on delete cascade,
  activity_date    date    not null,
  modules_active   text[]  not null default '{}',
  checklist_done   integer not null default 0,
  checklist_total  integer not null default 0,
  mood             text    check (mood in ('great', 'good', 'neutral', 'bad', 'awful')),
  unique(user_id, activity_date)
);

alter table user_streaks        enable row level security;
alter table daily_activity_log  enable row level security;

create policy "users_manage_own_streaks"
  on user_streaks for all
  using (auth.uid() = user_id);

create policy "users_manage_own_activity"
  on daily_activity_log for all
  using (auth.uid() = user_id);

create index if not exists activity_user_date_idx
  on daily_activity_log(user_id, activity_date desc);

-- Função para calcular/atualizar streak automaticamente
create or replace function upsert_user_streak(p_user_id uuid)
returns void language plpgsql as $$
declare
  v_last_date date;
  v_current   integer;
  v_longest   integer;
begin
  select last_active_date, current_streak, longest_streak
    into v_last_date, v_current, v_longest
    from user_streaks
   where user_id = p_user_id;

  if not found then
    insert into user_streaks(user_id, current_streak, longest_streak, last_active_date)
    values (p_user_id, 1, 1, current_date);
  elsif v_last_date = current_date then
    -- já registrado hoje, nada a fazer
    null;
  elsif v_last_date = current_date - 1 then
    -- consecutivo
    v_current := v_current + 1;
    v_longest := greatest(v_longest, v_current);
    update user_streaks
       set current_streak = v_current,
           longest_streak = v_longest,
           last_active_date = current_date,
           updated_at = now()
     where user_id = p_user_id;
  else
    -- quebrou o streak
    update user_streaks
       set current_streak = 1,
           last_active_date = current_date,
           updated_at = now()
     where user_id = p_user_id;
  end if;
end;
$$;

-- Migration 009: Streaks e log de atividade diária
-- Depende de: 001_bootstrap.sql

-- Tabela de streak (uma linha por usuário)
create table if not exists public.user_streaks (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references auth.users(id) on delete cascade,
  current_streak   integer     not null default 0,
  longest_streak   integer     not null default 0,
  last_active_date date,
  updated_at       timestamptz not null default now(),
  unique(user_id)
);

-- Log de atividade diária (uma linha por usuário/dia)
create table if not exists public.daily_activity_log (
  id              uuid    primary key default gen_random_uuid(),
  user_id         uuid    not null references auth.users(id) on delete cascade,
  activity_date   date    not null,
  modules_active  text[]  not null default '{}',
  checklist_done  integer not null default 0,
  checklist_total integer not null default 0,
  mood            text    check (mood in ('great', 'good', 'neutral', 'bad', 'awful')),
  unique(user_id, activity_date)
);

-- RLS
alter table public.user_streaks       enable row level security;
alter table public.daily_activity_log enable row level security;

create policy "users_manage_own_streaks"
  on public.user_streaks for all
  using (auth.uid() = user_id);

create policy "users_manage_own_activity"
  on public.daily_activity_log for all
  using (auth.uid() = user_id);

-- Índice
create index if not exists activity_user_date_idx
  on public.daily_activity_log(user_id, activity_date desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- Função: calcula e atualiza o streak do usuário
-- Chamar via: select public.upsert_user_streak('<user_id>');
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.upsert_user_streak(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_last_date date;
  v_current   integer;
  v_longest   integer;
begin
  select last_active_date, current_streak, longest_streak
    into v_last_date, v_current, v_longest
    from public.user_streaks
   where user_id = p_user_id;

  if not found then
    -- Primeiro registro
    insert into public.user_streaks(user_id, current_streak, longest_streak, last_active_date)
    values (p_user_id, 1, 1, current_date);

  elsif v_last_date = current_date then
    -- Já registrado hoje — nada a fazer
    null;

  elsif v_last_date = current_date - interval '1 day' then
    -- Dia consecutivo — incrementa
    v_current := v_current + 1;
    v_longest := greatest(v_longest, v_current);
    update public.user_streaks
       set current_streak  = v_current,
           longest_streak  = v_longest,
           last_active_date = current_date,
           updated_at      = now()
     where user_id = p_user_id;

  else
    -- Quebrou o streak — reinicia
    update public.user_streaks
       set current_streak  = 1,
           last_active_date = current_date,
           updated_at      = now()
     where user_id = p_user_id;
  end if;
end;
$$;

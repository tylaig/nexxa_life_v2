-- Migration 014: Gamification, progressive scores, missions and achievements
-- Depends on: 001_bootstrap.sql, 003_diagnostic.sql, 009_streaks.sql

-- ─────────────────────────────────────────────────────────────────────────────
-- Shared types are kept as text + check constraints for migration portability.
-- Life areas: health, mind, productivity, finances, relations, purpose
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.life_area_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  area text not null check (area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  score numeric(5,2) not null default 0 check (score >= 0 and score <= 100),
  level integer not null default 1 check (level >= 1),
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  diagnostic_score numeric(5,2) check (diagnostic_score is null or (diagnostic_score >= 0 and diagnostic_score <= 100)),
  behavior_score numeric(5,2) not null default 0 check (behavior_score >= 0 and behavior_score <= 100),
  consistency_score numeric(5,2) not null default 0 check (consistency_score >= 0 and consistency_score <= 100),
  reflection_score numeric(5,2) not null default 0 check (reflection_score >= 0 and reflection_score <= 100),
  last_calculated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, area)
);

create table if not exists public.score_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  area text not null check (area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  event_type text not null check (event_type in (
    'diagnostic_baseline',
    'question_answered',
    'mission_created',
    'mission_completed',
    'mission_skipped',
    'checklist_completed',
    'agenda_completed',
    'journal_entry',
    'manual_adjustment',
    'weekly_review',
    'achievement_unlocked'
  )),
  source_type text,
  source_id uuid,
  xp_delta integer not null default 0,
  score_delta numeric(5,2) not null default 0,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.adaptive_questions (
  id uuid primary key default gen_random_uuid(),
  area text not null check (area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  question text not null,
  type text not null check (type in ('diagnostic', 'daily_checkin', 'root_cause', 'adaptive', 'weekly_review', 'maintenance')),
  answer_kind text not null default 'scale' check (answer_kind in ('scale', 'text', 'boolean', 'choice')),
  weight numeric(5,2) not null default 1,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_question_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid references public.adaptive_questions(id) on delete set null,
  area text not null check (area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  answer_text text,
  answer_value numeric(6,2),
  impact_score numeric(5,2) not null default 0,
  impact_xp integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  area text not null check (area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  type text not null check (type in ('daily', 'weekly', 'recovery', 'boss', 'maintenance')),
  title text not null,
  description text,
  xp_reward integer not null default 0 check (xp_reward >= 0),
  score_impact numeric(5,2) not null default 0,
  status text not null default 'active' check (status in ('active', 'completed', 'failed', 'skipped', 'archived')),
  starts_at timestamptz not null default now(),
  due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  area text check (area is null or area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  title text not null,
  description text,
  icon text,
  xp_reward integer not null default 0 check (xp_reward >= 0),
  condition jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique(user_id, achievement_id)
);

-- Indexes
create index if not exists life_area_scores_user_idx
  on public.life_area_scores(user_id, area);

create index if not exists score_events_user_area_date_idx
  on public.score_events(user_id, area, created_at desc);

create index if not exists adaptive_questions_area_type_idx
  on public.adaptive_questions(area, type, active);

create index if not exists user_question_answers_user_area_date_idx
  on public.user_question_answers(user_id, area, created_at desc);

create index if not exists missions_user_area_status_idx
  on public.missions(user_id, area, status, due_at);

create index if not exists user_achievements_user_idx
  on public.user_achievements(user_id, unlocked_at desc);

-- RLS
alter table public.life_area_scores enable row level security;
alter table public.score_events enable row level security;
alter table public.user_question_answers enable row level security;
alter table public.missions enable row level security;
alter table public.user_achievements enable row level security;
alter table public.adaptive_questions enable row level security;
alter table public.achievements enable row level security;

create policy "users_manage_own_life_area_scores"
  on public.life_area_scores for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users_manage_own_score_events"
  on public.score_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users_manage_own_question_answers"
  on public.user_question_answers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users_manage_own_missions"
  on public.missions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users_read_own_achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "users_insert_own_achievements"
  on public.user_achievements for insert
  with check (auth.uid() = user_id);

create policy "authenticated_read_adaptive_questions"
  on public.adaptive_questions for select
  using (auth.role() = 'authenticated');

create policy "authenticated_read_achievements"
  on public.achievements for select
  using (auth.role() = 'authenticated');

-- Helpers
create or replace function public.nexxa_level_for_xp(p_xp integer)
returns integer
language sql
immutable
as $$
  select greatest(1, floor(sqrt(greatest(p_xp, 0)::numeric / 100))::integer + 1);
$$;

create or replace function public.nexxa_clamp_score(p_score numeric)
returns numeric
language sql
immutable
as $$
  select least(100, greatest(0, coalesce(p_score, 0)));
$$;

-- View: latest gamified cockpit per user/area
create or replace view public.v_life_area_cockpit as
select
  las.*,
  public.nexxa_level_for_xp(las.xp) as calculated_level,
  case
    when las.score >= 80 then 'excelencia'
    when las.score >= 60 then 'aceleracao'
    when las.score >= 40 then 'desenvolvimento'
    else 'recuperacao'
  end as stage
from public.life_area_scores las;

-- Seed adaptive questions
insert into public.adaptive_questions(area, type, answer_kind, question, weight, metadata) values
('health', 'daily_checkin', 'scale', 'De 0 a 10, como está sua energia física hoje?', 1, '{"xp":10}'::jsonb),
('health', 'root_cause', 'text', 'O que mais está drenando sua energia nesta semana?', 1.2, '{"xp":20}'::jsonb),
('health', 'weekly_review', 'scale', 'O quanto sua rotina de sono e corpo sustentou sua semana?', 1.4, '{"xp":30}'::jsonb),
('mind', 'daily_checkin', 'scale', 'De 0 a 10, quanta clareza mental você sente agora?', 1, '{"xp":10}'::jsonb),
('mind', 'root_cause', 'text', 'Qual pensamento ou preocupação está ocupando mais espaço mental?', 1.2, '{"xp":20}'::jsonb),
('mind', 'weekly_review', 'scale', 'O quanto você conseguiu observar e organizar suas emoções esta semana?', 1.4, '{"xp":30}'::jsonb),
('productivity', 'daily_checkin', 'scale', 'De 0 a 10, quão claro está o foco principal do seu dia?', 1, '{"xp":10}'::jsonb),
('productivity', 'root_cause', 'text', 'O que está mais travando sua execução agora?', 1.2, '{"xp":20}'::jsonb),
('productivity', 'weekly_review', 'scale', 'O quanto você executou o que realmente importava esta semana?', 1.4, '{"xp":30}'::jsonb),
('finances', 'daily_checkin', 'scale', 'De 0 a 10, quanta clareza financeira você sente hoje?', 1, '{"xp":10}'::jsonb),
('finances', 'root_cause', 'text', 'Qual pendência financeira está drenando energia ou atenção?', 1.2, '{"xp":20}'::jsonb),
('relations', 'daily_checkin', 'scale', 'De 0 a 10, quão conectado você se sentiu com pessoas importantes?', 1, '{"xp":10}'::jsonb),
('relations', 'root_cause', 'text', 'Qual conversa ou relação precisa de atenção nesta semana?', 1.2, '{"xp":20}'::jsonb),
('purpose', 'daily_checkin', 'scale', 'De 0 a 10, o quanto suas ações de hoje se conectam ao seu futuro?', 1, '{"xp":10}'::jsonb),
('purpose', 'root_cause', 'text', 'Qual decisão aproximaria você da vida que quer construir?', 1.2, '{"xp":20}'::jsonb)
on conflict do nothing;

-- Seed achievements
insert into public.achievements(key, area, title, description, icon, xp_reward, condition) values
('first_diagnostic', null, 'Primeiro mapa da vida', 'Concluiu o diagnóstico inicial e criou seu baseline evolutivo.', 'Compass', 100, '{"event":"diagnostic_baseline"}'::jsonb),
('first_mission', null, 'Primeira missão ativa', 'Criou a primeira missão gamificada de evolução.', 'Target', 50, '{"event":"mission_created"}'::jsonb),
('first_mission_completed', null, 'Missão cumprida', 'Concluiu a primeira missão da jornada.', 'CheckCircle2', 80, '{"event":"mission_completed"}'::jsonb),
('health_recovery_start', 'health', 'Recuperação de energia', 'Iniciou uma missão para recuperar saúde e energia.', 'Heart', 60, '{"area":"health","event":"mission_created"}'::jsonb),
('mind_clarity_start', 'mind', 'Clareza em construção', 'Registrou uma ação de clareza mental.', 'Brain', 60, '{"area":"mind"}'::jsonb),
('productivity_focus_start', 'productivity', 'Foco em campo', 'Criou uma ação objetiva de produtividade.', 'Target', 60, '{"area":"productivity"}'::jsonb)
on conflict (key) do nothing;

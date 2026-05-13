-- Migration 015: Interconnected Meu Ciclo core
-- Depends on: 005_goals.sql, 006_checklist.sql, 007_agenda.sql, 008_journal.sql, 014_gamification.sql

-- ─────────────────────────────────────────────────────────────────────────────
-- Goal milestones get area/score metadata.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.goal_milestones
  add column if not exists life_area text check (life_area is null or life_area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  add column if not exists xp_reward integer not null default 0 check (xp_reward >= 0),
  add column if not exists impact_score numeric(5,2) not null default 0;

-- ─────────────────────────────────────────────────────────────────────────────
-- Checklist items become connected execution units.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.checklist_items
  add column if not exists goal_id uuid references public.goals(id) on delete set null,
  add column if not exists mission_id uuid references public.missions(id) on delete set null,
  add column if not exists life_area text check (life_area is null or life_area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  add column if not exists source_type text,
  add column if not exists source_id uuid,
  add column if not exists impact_score numeric(5,2) not null default 0,
  add column if not exists xp_reward integer not null default 0 check (xp_reward >= 0);

-- ─────────────────────────────────────────────────────────────────────────────
-- Agenda events can point to the goal/mission they protect time for.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.agenda_events
  add column if not exists goal_id uuid references public.goals(id) on delete set null,
  add column if not exists mission_id uuid references public.missions(id) on delete set null,
  add column if not exists life_area text check (life_area is null or life_area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  add column if not exists source_type text,
  add column if not exists source_id uuid;

-- ─────────────────────────────────────────────────────────────────────────────
-- Journal entries can close a loop for a specific goal/mission/area.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.journal_entries
  add column if not exists goal_id uuid references public.goals(id) on delete set null,
  add column if not exists mission_id uuid references public.missions(id) on delete set null,
  add column if not exists life_area text check (life_area is null or life_area in ('health', 'mind', 'productivity', 'finances', 'relations', 'purpose')),
  add column if not exists source_type text,
  add column if not exists source_id uuid;

-- Indexes for connected reads
create index if not exists checklist_goal_date_idx
  on public.checklist_items(user_id, goal_id, item_date);

create index if not exists checklist_area_date_idx
  on public.checklist_items(user_id, life_area, item_date);

create index if not exists checklist_mission_date_idx
  on public.checklist_items(user_id, mission_id, item_date);

create index if not exists agenda_goal_date_idx
  on public.agenda_events(user_id, goal_id, event_date);

create index if not exists journal_goal_date_idx
  on public.journal_entries(user_id, goal_id, entry_date desc);

create index if not exists milestones_area_idx
  on public.goal_milestones(goal_id, life_area);

-- ─────────────────────────────────────────────────────────────────────────────
-- View: connected checklist for UI.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace view public.v_connected_checklist as
select
  ci.*,
  g.title as goal_title,
  g.category as goal_category,
  g.progress as goal_progress,
  m.title as mission_title,
  m.type as mission_type,
  coalesce(ci.life_area, m.area) as connected_area
from public.checklist_items ci
left join public.goals g on g.id = ci.goal_id and g.user_id = ci.user_id
left join public.missions m on m.id = ci.mission_id and m.user_id = ci.user_id;

-- ─────────────────────────────────────────────────────────────────────────────
-- View: goals with execution summary.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace view public.v_goal_execution_summary as
select
  g.id,
  g.user_id,
  g.title,
  g.description,
  g.category,
  g.status,
  g.progress,
  g.target_date,
  g.created_at,
  g.updated_at,
  count(ci.id) filter (where ci.id is not null) as checklist_total,
  count(ci.id) filter (where ci.done is true) as checklist_done,
  count(ae.id) filter (where ae.id is not null) as agenda_total,
  count(je.id) filter (where je.id is not null) as journal_total,
  coalesce(sum(ci.xp_reward) filter (where ci.done is true), 0) as earned_xp,
  coalesce(sum(ci.impact_score) filter (where ci.done is true), 0) as earned_score_impact
from public.goals g
left join public.checklist_items ci on ci.goal_id = g.id and ci.user_id = g.user_id
left join public.agenda_events ae on ae.goal_id = g.id and ae.user_id = g.user_id
left join public.journal_entries je on je.goal_id = g.id and je.user_id = g.user_id
group by g.id;

-- ─────────────────────────────────────────────────────────────────────────────
-- View: today's cycle cockpit.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace view public.v_today_cycle as
select
  u.id as user_id,
  current_date as cycle_date,
  count(ci.id) as checklist_total,
  count(ci.id) filter (where ci.done is true) as checklist_done,
  count(distinct ci.goal_id) filter (where ci.goal_id is not null) as connected_goals,
  count(distinct ci.life_area) filter (where ci.life_area is not null) as active_areas,
  count(ae.id) as agenda_total,
  count(je.id) as journal_total
from auth.users u
left join public.checklist_items ci on ci.user_id = u.id and ci.item_date = current_date
left join public.agenda_events ae on ae.user_id = u.id and ae.event_date = current_date
left join public.journal_entries je on je.user_id = u.id and je.entry_date = current_date
group by u.id;

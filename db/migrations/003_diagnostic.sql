-- Migration 003: Diagnóstico inicial
-- Depende de: 001_bootstrap.sql

create table if not exists public.diagnostic_results (
  id                   uuid        primary key default gen_random_uuid(),
  user_id              uuid        not null references auth.users(id) on delete cascade,

  -- Scores por área (0–10)
  score_health         integer     check (score_health between 0 and 10),
  score_mind           integer     check (score_mind between 0 and 10),
  score_productivity   integer     check (score_productivity between 0 and 10),
  score_finances       integer     check (score_finances between 0 and 10),
  score_relations      integer     check (score_relations between 0 and 10),
  score_purpose        integer     check (score_purpose between 0 and 10),

  -- Respostas brutas do questionário (JSON)
  raw_answers          jsonb       not null default '{}',

  -- Versão do questionário
  form_version         text        not null default 'v1',

  created_at           timestamptz not null default now()
);

-- Índice: diagnóstico mais recente do usuário
create index if not exists diagnostic_user_date_idx
  on public.diagnostic_results(user_id, created_at desc);

-- RLS
alter table public.diagnostic_results enable row level security;

create policy "users_manage_own_diagnostic"
  on public.diagnostic_results for all
  using (auth.uid() = user_id);

-- View auxiliar: score total calculado (evita coluna gerada com NULLs)
create or replace view public.v_diagnostic_scores as
select
  id,
  user_id,
  coalesce(score_health, 0)       as score_health,
  coalesce(score_mind, 0)         as score_mind,
  coalesce(score_productivity, 0) as score_productivity,
  coalesce(score_finances, 0)     as score_finances,
  coalesce(score_relations, 0)    as score_relations,
  coalesce(score_purpose, 0)      as score_purpose,
  (
    coalesce(score_health, 0) +
    coalesce(score_mind, 0) +
    coalesce(score_productivity, 0) +
    coalesce(score_finances, 0) +
    coalesce(score_relations, 0) +
    coalesce(score_purpose, 0)
  )                               as overall_score,
  form_version,
  created_at
from public.diagnostic_results;

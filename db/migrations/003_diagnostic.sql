-- Migration 003: Diagnóstico inicial
-- Armazena resultados do diagnóstico feito no onboarding

create table if not exists diagnostic_results (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users(id) on delete cascade,

  -- Áreas avaliadas (0-10 cada)
  score_health      integer check (score_health between 0 and 10),
  score_mind        integer check (score_mind between 0 and 10),
  score_productivity integer check (score_productivity between 0 and 10),
  score_finances    integer check (score_finances between 0 and 10),
  score_relations   integer check (score_relations between 0 and 10),
  score_purpose     integer check (score_purpose between 0 and 10),

  -- Resultado geral calculado
  overall_score     integer generated always as (
    coalesce(score_health, 0) + coalesce(score_mind, 0) +
    coalesce(score_productivity, 0) + coalesce(score_finances, 0) +
    coalesce(score_relations, 0) + coalesce(score_purpose, 0)
  ) stored,

  -- Respostas brutas do questionário (JSON livre)
  raw_answers   jsonb       not null default '{}',

  -- Versão do questionário aplicado
  form_version  text        not null default 'v1',

  created_at    timestamptz not null default now()
);

-- Índice para buscar o diagnóstico mais recente do usuário
create index if not exists diagnostic_user_date_idx
  on diagnostic_results(user_id, created_at desc);

alter table diagnostic_results enable row level security;

create policy "users_manage_own_diagnostic"
  on diagnostic_results for all
  using (auth.uid() = user_id);

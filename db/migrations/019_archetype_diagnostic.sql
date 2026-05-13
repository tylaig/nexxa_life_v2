-- Migration 019: Archetype diagnostic questions and result fields
-- Depends on: 003_diagnostic.sql, 018_profile_gamified_identity.sql

alter table public.diagnostic_results
  add column if not exists archetype_key text,
  add column if not exists archetype_scores jsonb not null default '{}';

alter table public.diagnostic_questions
  add column if not exists archetype_key text,
  add column if not exists archetype_weight numeric(5,2) not null default 1;

alter table public.diagnostic_results
  drop constraint if exists diagnostic_results_archetype_key_check,
  add constraint diagnostic_results_archetype_key_check
    check (archetype_key is null or archetype_key in (
      'fool','magician','priestess','empress','emperor','hierophant','lovers','chariot',
      'strength','hermit','wheel','justice','hanged','death','temperance','star'
    ));

alter table public.diagnostic_questions
  drop constraint if exists diagnostic_questions_archetype_key_check,
  add constraint diagnostic_questions_archetype_key_check
    check (archetype_key is null or archetype_key in (
      'fool','magician','priestess','empress','emperor','hierophant','lovers','chariot',
      'strength','hermit','wheel','justice','hanged','death','temperance','star'
    ));

create index if not exists diagnostic_questions_archetype_idx
  on public.diagnostic_questions(archetype_key, active);

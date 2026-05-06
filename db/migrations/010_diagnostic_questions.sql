-- Migration 010: Perguntas do Diagnóstico Inicial
-- Depende de: 003_diagnostic.sql

create table if not exists public.diagnostic_questions (
  id              uuid        primary key default gen_random_uuid(),
  area            text        not null
                              check (area in ('health','mind','productivity','finances','relations','purpose')),
  question_text   text        not null,
  question_order  integer     not null default 0,
  active          boolean     not null default true,
  created_at      timestamptz not null default now()
);

-- RLS (público para leitura, só admin escreve)
alter table public.diagnostic_questions enable row level security;

create policy "anyone_can_read_questions"
  on public.diagnostic_questions for select
  using (true);

-- Índice de ordenação
create index if not exists diagnostic_questions_order_idx
  on public.diagnostic_questions(area, question_order);

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: 12 perguntas padrão (2 por área)
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.diagnostic_questions (area, question_text, question_order) values
  -- Saúde
  ('health', 'Como você avalia sua energia física no dia a dia? (0 = exausto, 10 = cheio de energia)', 1),
  ('health', 'Com que frequência você pratica atividade física ou cuida da alimentação?', 2),

  -- Mente
  ('mind', 'Como está sua clareza mental e capacidade de concentração?', 1),
  ('mind', 'Você consegue gerenciar ansiedade e estresse de forma saudável?', 2),

  -- Produtividade
  ('productivity', 'Você sente que realiza as tarefas mais importantes do seu dia?', 1),
  ('productivity', 'Com que frequência você termina o dia com sensação de progresso real?', 2),

  -- Finanças
  ('finances', 'Como está seu controle financeiro atual? Você sabe para onde vai seu dinheiro?', 1),
  ('finances', 'Você está construindo reserva ou investindo para o futuro?', 2),

  -- Relações
  ('relations', 'Como está a qualidade dos seus relacionamentos mais importantes?', 1),
  ('relations', 'Você dedica tempo intencional para as pessoas que importam?', 2),

  -- Propósito
  ('purpose', 'Você sente que sua vida tem uma direção clara e significativa?', 1),
  ('purpose', 'Com que frequência você faz coisas alinhadas com seus valores pessoais?', 2);

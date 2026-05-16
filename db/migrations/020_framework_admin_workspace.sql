-- Migration 020: Framework admin operational workspace
-- Depends on: 004_app_user_profiles.sql, 010_diagnostic_questions.sql

create table if not exists public.admin_billing_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  monthly_price_cents integer not null default 0 check (monthly_price_cents >= 0),
  yearly_price_cents integer not null default 0 check (yearly_price_cents >= 0),
  currency text not null default 'BRL',
  active boolean not null default true,
  trial_days integer not null default 0 check (trial_days >= 0),
  seat_limit integer,
  ai_requests_limit integer,
  features jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_feature_flags (
  id uuid primary key default gen_random_uuid(),
  flag_key text not null unique,
  name text not null,
  description text not null default '',
  enabled boolean not null default false,
  rollout_percentage integer not null default 0 check (rollout_percentage between 0 and 100),
  audience text not null default 'internal',
  owner text not null default 'Engineering',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_ai_prompts (
  id uuid primary key default gen_random_uuid(),
  prompt_key text not null unique,
  name text not null,
  description text not null default '',
  model text not null default 'gpt-5-mini',
  system_prompt text not null default '',
  temperature numeric(3,2) not null default 0.40 check (temperature >= 0 and temperature <= 2),
  active boolean not null default true,
  version integer not null default 1 check (version > 0),
  owner text not null default 'AI Ops',
  guardrails jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_integrations (
  id uuid primary key default gen_random_uuid(),
  provider_key text not null unique,
  name text not null,
  description text not null default '',
  status text not null default 'planned' check (status in ('connected', 'planned', 'disabled', 'error')),
  auth_type text not null default 'api_key',
  webhook_url text,
  masked_secret text,
  last_sync_at timestamptz,
  owner text not null default 'Ops',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_email text,
  event_type text not null,
  entity_type text not null,
  entity_id text,
  severity text not null default 'info' check (severity in ('info', 'warning', 'critical')),
  summary text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_security_policies (
  id uuid primary key default gen_random_uuid(),
  policy_key text not null unique,
  name text not null,
  description text not null default '',
  status text not null default 'draft' check (status in ('active', 'draft', 'review')),
  enforcement_level text not null default 'monitor' check (enforcement_level in ('monitor', 'warn', 'block')),
  owner text not null default 'Security',
  review_frequency_days integer not null default 90 check (review_frequency_days > 0),
  last_reviewed_at timestamptz,
  config jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null unique,
  title text not null,
  surface text not null,
  content text not null default '',
  status text not null default 'draft' check (status in ('published', 'draft', 'archived')),
  audience text not null default 'all',
  owner text not null default 'Growth',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  label text not null,
  description text not null default '',
  value jsonb not null default '{}',
  category text not null default 'general',
  sensitive boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_billing_plans_active_idx on public.admin_billing_plans(active, slug);
create index if not exists admin_feature_flags_enabled_idx on public.admin_feature_flags(enabled, audience);
create index if not exists admin_ai_prompts_active_idx on public.admin_ai_prompts(active, prompt_key);
create index if not exists admin_integrations_status_idx on public.admin_integrations(status, provider_key);
create index if not exists admin_audit_events_created_idx on public.admin_audit_events(created_at desc, severity);
create index if not exists admin_security_policies_status_idx on public.admin_security_policies(status, enforcement_level);
create index if not exists admin_content_blocks_surface_idx on public.admin_content_blocks(surface, status);
create index if not exists admin_settings_category_idx on public.admin_settings(category, sensitive);

insert into public.admin_billing_plans (slug, name, description, monthly_price_cents, yearly_price_cents, trial_days, seat_limit, ai_requests_limit, features)
values
  ('free', 'Free', 'Entrada para validar diagnóstico, metas e rotina pessoal.', 0, 0, 0, 1, 25, '["Diagnóstico base", "Dashboard pessoal", "Checklist diário"]'),
  ('pro', 'Pro', 'Plano principal com IA, automações e histórico expandido.', 4900, 49000, 7, 1, 500, '["Nexxa IA", "Relatórios avançados", "Agenda integrada", "Marketplace"]'),
  ('teams', 'Teams', 'Operação para grupos, mentores e squads de performance.', 14900, 149000, 14, 10, 2500, '["Múltiplos assentos", "Auditoria", "Suporte prioritário", "Insights coletivos"]')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  monthly_price_cents = excluded.monthly_price_cents,
  yearly_price_cents = excluded.yearly_price_cents,
  trial_days = excluded.trial_days,
  seat_limit = excluded.seat_limit,
  ai_requests_limit = excluded.ai_requests_limit,
  features = excluded.features,
  updated_at = now();

insert into public.admin_feature_flags (flag_key, name, description, enabled, rollout_percentage, audience, owner)
values
  ('nexxa_ai_studio', 'Nexxa AI Studio', 'Libera experiências assistidas por IA no produto.', true, 25, 'pro-users', 'AI Ops'),
  ('calendar_sync_google', 'Google Calendar Sync', 'Habilita sincronização de agenda com provedores externos.', false, 0, 'internal', 'Ops'),
  ('marketplace_offers', 'Marketplace de Ofertas', 'Exibe parceiros e ofertas selecionadas no marketplace.', true, 100, 'all-users', 'Growth')
on conflict (flag_key) do update set
  name = excluded.name,
  description = excluded.description,
  enabled = excluded.enabled,
  rollout_percentage = excluded.rollout_percentage,
  audience = excluded.audience,
  owner = excluded.owner,
  updated_at = now();

insert into public.admin_ai_prompts (prompt_key, name, description, model, system_prompt, temperature, active, version, owner, guardrails)
values
  ('daily_coach', 'Coach diário Nexxa', 'Prompt base para orientar próxima ação do dia.', 'gpt-5-mini', 'Você é a Nexxa, uma copilota objetiva de evolução pessoal.', 0.40, true, 1, 'AI Ops', '["Não diagnosticar doenças", "Sugerir ações pequenas", "Preservar privacidade"]'),
  ('diagnostic_interpreter', 'Intérprete diagnóstico', 'Explica resultados do diagnóstico de forma acionável.', 'gpt-5-mini', 'Transforme resultados diagnósticos em leitura clara e próxima ação.', 0.35, true, 1, 'Produto', '["Não prometer resultados", "Evitar linguagem clínica", "Manter tom encorajador"]')
on conflict (prompt_key) do update set
  name = excluded.name,
  description = excluded.description,
  model = excluded.model,
  system_prompt = excluded.system_prompt,
  temperature = excluded.temperature,
  active = excluded.active,
  version = excluded.version,
  owner = excluded.owner,
  guardrails = excluded.guardrails,
  updated_at = now();

insert into public.admin_integrations (provider_key, name, description, status, auth_type, webhook_url, masked_secret, owner)
values
  ('supabase', 'Supabase', 'Banco, autenticação e storage principal do SaaS.', 'connected', 'service_role', null, '••••configured', 'Engineering'),
  ('google_calendar', 'Google Calendar', 'Sincronização futura de agenda e blocos recorrentes.', 'planned', 'oauth', null, null, 'Ops'),
  ('n8n', 'n8n Automations', 'Webhooks para lifecycle, ativação e reengajamento.', 'planned', 'webhook', null, null, 'Lifecycle')
on conflict (provider_key) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  auth_type = excluded.auth_type,
  webhook_url = excluded.webhook_url,
  masked_secret = excluded.masked_secret,
  owner = excluded.owner,
  updated_at = now();

insert into public.admin_security_policies (policy_key, name, description, status, enforcement_level, owner, review_frequency_days, config)
values
  ('admin_role_review', 'Revisão periódica de administradores', 'Garante que acessos admin continuem necessários.', 'active', 'warn', 'Security', 30, '{"scope":"admin_profiles"}'),
  ('sensitive_action_audit', 'Auditoria de ações sensíveis', 'Registra alterações em billing, flags, prompts e políticas.', 'active', 'monitor', 'Security', 60, '{"captureMetadata":true}'),
  ('lgpd_export_readiness', 'Preparação LGPD', 'Mantém trilha para exportação e exclusão sob solicitação.', 'review', 'monitor', 'Legal', 90, '{"dataMap":"pending"}')
on conflict (policy_key) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  enforcement_level = excluded.enforcement_level,
  owner = excluded.owner,
  review_frequency_days = excluded.review_frequency_days,
  config = excluded.config,
  updated_at = now();

insert into public.admin_content_blocks (block_key, title, surface, content, status, audience, owner, published_at)
values
  ('dashboard_hero', 'Hero do dashboard', 'dashboard', 'Transforme intenção em rotina com o ciclo NexxaLife.', 'published', 'all', 'Growth', now()),
  ('academy_banner', 'Banner Academia', 'academy', 'Trilhas práticas para evoluir saúde, foco e execução.', 'draft', 'pro', 'Content', null),
  ('marketplace_intro', 'Introdução Marketplace', 'marketplace', 'Recursos e parceiros para acelerar sua jornada.', 'published', 'all', 'Growth', now())
on conflict (block_key) do update set
  title = excluded.title,
  surface = excluded.surface,
  content = excluded.content,
  status = excluded.status,
  audience = excluded.audience,
  owner = excluded.owner,
  published_at = excluded.published_at,
  updated_at = now();

insert into public.admin_settings (setting_key, label, description, value, category, sensitive)
values
  ('admin_workspace_mode', 'Modo do workspace admin', 'Define como a operação administrativa é apresentada.', '{"mode":"tabs","entrypoint":"command-menu"}', 'general', false),
  ('ai_monthly_budget', 'Orçamento mensal de IA', 'Limite operacional para consumo de IA antes de alerta.', '{"currency":"BRL","amount":1500}', 'ai', false),
  ('support_contact', 'Contato de suporte', 'Canal exibido para dúvidas operacionais.', '{"email":"suporte@nexxalife.local"}', 'support', false)
on conflict (setting_key) do update set
  label = excluded.label,
  description = excluded.description,
  value = excluded.value,
  category = excluded.category,
  sensitive = excluded.sensitive,
  updated_at = now();

insert into public.admin_audit_events (event_type, entity_type, entity_id, severity, summary, metadata)
values
  ('workspace_seeded', 'framework_admin', '020_framework_admin_workspace', 'info', 'Workspace admin inicial criado com tabelas operacionais e seeds.', '{"migration":"020_framework_admin_workspace"}')
on conflict do nothing;

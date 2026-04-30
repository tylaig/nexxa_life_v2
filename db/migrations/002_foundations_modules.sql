create table if not exists integration_connections (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  provider text not null,
  status text not null default 'draft',
  display_name text not null,
  config_public jsonb not null default '{}'::jsonb,
  secret_ref text,
  last_validated_at timestamptz,
  last_error jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, workspace_id, provider, display_name)
);

create table if not exists n8n_instances (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  integration_connection_id text not null references integration_connections(id) on delete cascade,
  base_url text not null,
  auth_mode text not null,
  api_version text,
  workspace_external_id text,
  health_status text not null default 'unknown',
  capabilities jsonb not null default '[]'::jsonb,
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists n8n_workflow_templates (
  id text primary key,
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null,
  workflow_json jsonb not null,
  input_schema jsonb not null default '{}'::jsonb,
  output_schema jsonb not null default '{}'::jsonb,
  compatibility_version text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists n8n_workflow_bindings (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  n8n_instance_id text not null references n8n_instances(id) on delete cascade,
  template_id text,
  workflow_external_id text not null,
  workflow_name text not null,
  binding_type text not null,
  trigger_event text not null,
  input_mapping jsonb not null default '{}'::jsonb,
  output_mapping jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  installed_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, workflow_external_id, binding_type, trigger_event)
);
create index if not exists idx_n8n_workflow_bindings_scope_event on n8n_workflow_bindings (tenant_id, workspace_id, trigger_event);

create table if not exists n8n_execution_logs (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  n8n_workflow_binding_id text not null references n8n_workflow_bindings(id) on delete cascade,
  trigger_event text not null,
  source_entity_type text not null,
  source_entity_id text not null,
  request_payload jsonb not null default '{}'::jsonb,
  response_payload jsonb,
  execution_external_id text,
  status text not null,
  error_message text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists automation_variable_definitions (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  scope_type text not null,
  scope_key text not null,
  variable_name text not null,
  data_type text not null,
  description text not null default '',
  example_value jsonb not null default '{}'::jsonb,
  is_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, workspace_id, scope_type, scope_key, variable_name)
);

create table if not exists knowledge_sources (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  source_type text not null,
  name text not null,
  status text not null default 'draft',
  config jsonb not null default '{}'::jsonb,
  last_ingested_at timestamptz,
  last_error jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists knowledge_documents (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  source_id text not null references knowledge_sources(id) on delete cascade,
  external_ref text,
  title text not null,
  mime_type text not null,
  language text,
  checksum text not null,
  version integer not null default 1,
  status text not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  content_text text not null default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_id, checksum)
);

create table if not exists knowledge_chunks (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  document_id text not null references knowledge_documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  token_count integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  embedding_status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (document_id, chunk_index)
);
create index if not exists idx_knowledge_chunks_scope_document on knowledge_chunks (tenant_id, workspace_id, document_id);

create table if not exists knowledge_embeddings (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  chunk_id text not null references knowledge_chunks(id) on delete cascade,
  provider text not null,
  model text not null,
  embedding jsonb not null default '[]'::jsonb,
  dimensions integer not null,
  embedded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists idx_knowledge_embeddings_scope_chunk on knowledge_embeddings (tenant_id, workspace_id, chunk_id);

create table if not exists retrieval_logs (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  source_context_type text not null,
  source_context_id text not null,
  query_text text not null,
  filters jsonb not null default '{}'::jsonb,
  top_k integer not null default 5,
  results jsonb not null default '[]'::jsonb,
  grounding_required boolean not null default false,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists skills (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  name text not null,
  slug text not null,
  description text not null default '',
  category text not null default 'general',
  status text not null default 'draft',
  current_version_id text,
  output_mode text not null default 'text',
  default_model text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, workspace_id, slug)
);

create table if not exists skill_versions (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  skill_id text not null references skills(id) on delete cascade,
  version integer not null,
  prompt_template text not null,
  input_schema jsonb not null default '{}'::jsonb,
  output_schema jsonb,
  detected_variables jsonb not null default '[]'::jsonb,
  execution_context_config jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by text not null default 'system',
  created_at timestamptz not null default now(),
  unique (skill_id, version)
);

create table if not exists skill_variables (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  skill_version_id text not null references skill_versions(id) on delete cascade,
  variable_name text not null,
  data_type text not null default 'string',
  is_required boolean not null default true,
  default_value jsonb,
  description text,
  source_binding_type text,
  source_binding_value text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (skill_version_id, variable_name)
);

create table if not exists skill_bindings (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  skill_id text not null references skills(id) on delete cascade,
  binding_target_type text not null,
  binding_target_id text,
  trigger_mode text not null default 'manual',
  config jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skill_execution_logs (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  skill_id text not null references skills(id) on delete cascade,
  skill_version_id text not null references skill_versions(id) on delete cascade,
  trigger_source text not null,
  source_entity_type text not null,
  source_entity_id text not null,
  input_payload jsonb not null default '{}'::jsonb,
  resolved_prompt text not null,
  output_text text,
  output_json jsonb,
  model text,
  token_usage jsonb,
  status text not null,
  error_message text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  name text not null,
  objective text not null,
  status text not null default 'draft',
  channel text not null,
  sender_id text not null,
  template_id text not null,
  template_version text not null,
  audience_id text not null,
  automation_on_sent_id text,
  automation_on_reply_id text,
  skill_on_reply_id text,
  schedule_at timestamptz,
  dry_run_enabled boolean not null default false,
  created_by text not null,
  launched_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_campaigns_scope_status_schedule on campaigns (tenant_id, workspace_id, status, schedule_at desc);

create table if not exists campaign_audiences (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  campaign_id text not null references campaigns(id) on delete cascade,
  audience_id text not null,
  audience_name text not null,
  filter_snapshot jsonb not null,
  estimated_count integer not null default 0,
  eligible_count integer not null default 0,
  blocked_count integer not null default 0,
  snapshot_taken_at timestamptz not null default now()
);

create table if not exists campaign_template_bindings (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  campaign_id text not null references campaigns(id) on delete cascade,
  template_id text not null,
  template_variable_name text not null,
  binding_source_type text not null,
  binding_source_value text not null,
  is_required boolean not null default true,
  fallback_value text,
  resolved_preview jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, template_variable_name)
);

create table if not exists campaign_runs (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  campaign_id text not null references campaigns(id) on delete cascade,
  run_type text not null,
  status text not null,
  started_at timestamptz,
  finished_at timestamptz,
  total_recipients integer not null default 0,
  success_count integer not null default 0,
  failure_count integer not null default 0,
  metrics_json jsonb not null default '{}'::jsonb,
  error_summary jsonb,
  created_at timestamptz not null default now()
);

create table if not exists campaign_recipients (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  campaign_id text not null references campaigns(id) on delete cascade,
  contact_id text not null references contacts(id) on delete cascade,
  conversation_id text references conversations(id) on delete set null,
  recipient_phone_e164 text not null,
  eligibility_status text not null,
  blocked_reason text,
  batch_number integer not null default 1,
  provider_message_id text,
  sent_at timestamptz,
  delivered_at timestamptz,
  read_at timestamptz,
  replied_at timestamptz,
  converted_at timestamptz,
  payload_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, contact_id)
);
create index if not exists idx_campaign_recipients_campaign_status on campaign_recipients (campaign_id, eligibility_status);

create table if not exists campaign_events (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  campaign_id text not null references campaigns(id) on delete cascade,
  campaign_run_id text references campaign_runs(id) on delete cascade,
  campaign_recipient_id text references campaign_recipients(id) on delete cascade,
  event_type text not null,
  event_source text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

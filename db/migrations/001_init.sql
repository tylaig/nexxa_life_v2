create extension if not exists pgcrypto;

create table if not exists tenants (
  id text primary key,
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workspaces (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  slug text not null,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create table if not exists contacts (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  full_name text not null,
  primary_phone_e164 text not null,
  primary_email text,
  avatar_url text,
  tags jsonb not null default '[]'::jsonb,
  is_vip boolean not null default false,
  lifecycle_stage text not null,
  lifetime_value_cents bigint not null default 0,
  total_orders_count integer not null default 0,
  nps_score integer,
  last_purchase_at timestamptz,
  city text,
  consent_marketing boolean not null default true,
  first_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contacts_workspace_phone
  on contacts (tenant_id, workspace_id, primary_phone_e164);

create table if not exists orders (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  contact_id text,
  order_number text not null,
  customer_name text not null,
  customer_phone text not null,
  total_amount_cents bigint not null,
  currency_code text not null default 'BRL',
  payment_method text not null,
  payment_status text not null,
  fulfillment_status text not null,
  created_at timestamptz not null,
  sales_channel text not null,
  brand_name text not null,
  items_count integer not null default 0,
  risk_score integer not null default 0,
  has_open_ticket boolean not null default false,
  created_record_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, workspace_id, order_number)
);

create index if not exists idx_orders_workspace_created_at
  on orders (tenant_id, workspace_id, created_at desc);

create table if not exists conversations (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  contact_snapshot jsonb not null,
  channel text not null,
  channel_number text not null,
  brand text not null,
  status text not null,
  priority text not null,
  assignee_snapshot jsonb,
  team text not null,
  tags jsonb not null default '[]'::jsonb,
  unread_count integer not null default 0,
  last_activity_at timestamptz not null,
  sla_due_at timestamptz,
  preview text not null,
  order_snapshot jsonb,
  ai_suggestion_snapshot jsonb,
  intent text,
  sentiment text,
  is_ai_handled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_conversations_workspace_activity
  on conversations (tenant_id, workspace_id, last_activity_at desc);

create table if not exists messages (
  id text primary key,
  tenant_id text not null references tenants(id) on delete cascade,
  workspace_id text not null references workspaces(id) on delete cascade,
  conversation_id text not null references conversations(id) on delete cascade,
  direction text not null,
  content text not null,
  timestamp timestamptz not null,
  sender_snapshot jsonb not null,
  status text,
  is_ai_suggested boolean not null default false,
  attachments jsonb not null default '[]'::jsonb,
  template_name text,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation_timestamp
  on messages (conversation_id, timestamp asc);

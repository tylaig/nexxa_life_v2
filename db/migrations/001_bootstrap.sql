-- Migration 001: Bootstrap — extensões e utilitários base
-- Deve ser executada antes de qualquer outra migration

-- Extensões necessárias
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";      -- busca fuzzy em texto
create extension if not exists "unaccent";     -- normalização de acentos em buscas

-- Função utilitária: atualiza updated_at automaticamente
-- (declarada aqui para estar disponível em todas as migrations seguintes)
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Função utilitária: retorna o user_id autenticado atual
-- útil em policies RLS
create or replace function auth_uid()
returns uuid language sql stable as $$
  select auth.uid()
$$;

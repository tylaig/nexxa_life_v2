-- Migration 001: Bootstrap — extensões e utilitários base
-- Execute FIRST, before all other migrations

-- Extensões necessárias
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";
create extension if not exists "unaccent";

-- Função utilitária compartilhada: atualiza updated_at automaticamente
-- Usada como trigger em TODAS as tabelas com updated_at
create or replace function public.update_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Migration 011: Role do usuário para superfícies administrativas
-- Mantém usuários existentes como role padrão "user" e permite promover administradores explicitamente.

alter table public.app_user_profiles
  add column if not exists role text not null default 'user'
  check (role in ('user', 'admin'));

create index if not exists app_user_profiles_role_idx
  on public.app_user_profiles(role);

-- Usuários continuam podendo ler/gerenciar seu próprio perfil.
-- A promoção para admin deve ser feita por operador de banco/service role fora do cliente público.

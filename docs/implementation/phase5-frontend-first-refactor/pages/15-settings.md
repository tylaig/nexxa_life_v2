# Settings

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Settings`.

## Rotas atuais
- /settings
- /settings/profile
- /settings/workspace
- /settings/users
- /settings/channels
- /settings/security
- /settings/billing
- /settings/providers
- /settings/integrations

## Rotas alvo
- /settings
- /settings/profile
- /settings/workspace
- /settings/users
- /settings/channels
- /settings/security
- /settings/billing
- /settings/setup
- /settings/health
- /settings/checklist

## O que já está forte
- Cobertura estrutural ampla já existe.
- Hub administrativo faz sentido.

## Gaps validados nesta rodada
- Muitos saves e convites parecem mock/no-op.
- Falta guided setup e health do workspace.
- Conexões vs Administração ainda geram fricção conceitual.

## Blocos e superfícies que faltam
- Setup center.
- Workspace health.
- Checklist de onboarding/admin.
- Permissões mais profundas.

## Estrutura de refatoração sugerida
- Criar `WorkspaceSetupProgress`, `SettingsHealthSummary`, `AdminChecklistPanel`.
- Definir fronteira clara entre configuração administrativa e runtime operacional.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

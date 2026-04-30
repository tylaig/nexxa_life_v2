# Fase 2 — CRUD e Persistência Inicial

## Objetivo

Sair do bootstrap estático e materializar fluxos reais mínimos para os novos domínios, começando por Campaigns e avançando de forma incremental para Integrations/n8n e AI Skills.

## Próximos passos conferidos

1. avançar para CRUD inicial e persistência real por módulo
2. conectar forms, health checks e flows reais de n8n/RAG/skills/campaigns

## Ordem de execução desta fase

### Bloco A — Campaigns
1. criar contratos zod para list/create campaign
2. criar store local fallback para campaigns
3. criar repository com fallback em memória e persistência Postgres quando `DATABASE_URL` existir
4. expandir `GET /api/v1/campaigns` para retornar itens reais
5. adicionar `POST /api/v1/campaigns` para criar campanha draft
6. adicionar testes RED/GREEN para contracts, repository e API
7. substituir página placeholder por listagem/estado real inicial

### Bloco B — Integrations
1. criar contratos para conexões e health check manual
2. criar repository com `integration_connections`
3. expandir `GET /api/v1/integrations` para listar conexões
4. adicionar `POST /api/v1/integrations` para registrar conexão draft
5. adicionar endpoint de health/validation manual bootstrap
6. adicionar testes de API e repository

### Bloco C — AI Skills
1. criar contratos para skill e skill version
2. criar repository com `skills` + `skill_versions`
3. adicionar `GET /api/v1/skills` com itens reais
4. adicionar `POST /api/v1/skills` com parsing de variáveis `{{$var}}`
5. persistir `detected_variables` na versão criada
6. adicionar testes de API, contracts e repository

## Critérios de validação
- `npm test`
- `npm run build`
- cada módulo novo deve passar por TDD
- progresso salvo em documento vivo ao fim de cada bloco

## Registro de progresso
Toda entrega desta fase deve refletir imediatamente em:
- checklist da sessão
- `docs/implementation/phase2-progress.md`

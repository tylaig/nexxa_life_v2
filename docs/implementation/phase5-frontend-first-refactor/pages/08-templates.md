# Templates

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Templates`.

## Rotas atuais
- /templates
- /templates/new
- /templates/[templateId]
- /templates/[templateId]/edit

## Rotas alvo
- /templates
- /templates/new
- /templates/[templateId]
- /templates/[templateId]/edit

## O que já está forte
- Uma das superfícies mais maduras visualmente.
- Boa leitura de performance e qualidade.

## Gaps validados nesta rodada
- Alta densidade em cards.
- Faltam ações rápidas e governança progressiva.
- Persistência e versionamento seguem futuros.

## Blocos e superfícies que faltam
- Preview expandido.
- Histórico de revisões.
- Ações de duplicar, revisar e aprovar/publicar.

## Estrutura de refatoração sugerida
- Extrair `TemplateLifecycleBadge`, `TemplateQuickActions`, `TemplatePreviewDrawer`.
- Reduzir ruído visual na primeira leitura.
- Preparar contrato de versionamento backend-ready.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

# Contacts

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Contacts`.

## Rotas atuais
- /contacts

## Rotas alvo
- /contacts
- /contacts/[contactId]

## O que já está forte
- Boa combinação de KPIs, banner, tabs e tabela.
- Clique na linha já abre detalhe rápido.

## Gaps validados nesta rodada
- Filtros não responderam de forma clara.
- Abrir conversa no detalhe não fechou o loop.
- Tabela ainda muito desktop-first.

## Blocos e superfícies que faltam
- Detalhe navegável ou drawer persistente.
- Kanban validado e operacional.
- Ações rápidas reais por contato.

## Estrutura de refatoração sugerida
- Extrair `ContactInsightBanner`, `ContactSegmentPills`, `ContactDetailPanel`.
- Criar modo tabela + modo kanban com contrato compartilhado.
- Padronizar ações com Inbox e Campaigns.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

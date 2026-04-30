# Automations

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Automations`.

## Rotas atuais
- /automations
- /automations/new
- /automations/[automationId]
- /automations/[automationId]/edit

## Rotas alvo
- /automations
- /automations/new
- /automations/[automationId]
- /automations/[automationId]/edit

## O que já está forte
- Melhorou bastante estruturalmente.
- Cards já comunicam trigger, sucesso e runs.

## Gaps validados nesta rodada
- Detalhe e edição ainda precisam profundidade funcional real.
- CTA Gerar com IA precisa fluxo bem definido.
- Runs, logs e dependências não estão no primeiro plano.

## Blocos e superfícies que faltam
- Run detail.
- Teste de fluxo.
- Propriedades de nó e validação pré-publicação.

## Estrutura de refatoração sugerida
- Extrair `AutomationRunHealth`, `AutomationDependencyPanel`, `NodePropertiesInspector`.
- Tratar builder como produto próprio de edição.
- Adicionar telemetria operacional.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

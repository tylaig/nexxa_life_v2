# Inbox

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Inbox`.

## Rotas atuais
- /inbox

## Rotas alvo
- /inbox

## O que já está forte
- Melhor referência operacional atual do produto.
- Boa separação entre triagem, thread e contexto.

## Gaps validados nesta rodada
- Densidade muito alta para onboarding e desktop narrow.
- Muitas quick actions ainda são mock via toast.
- Painel direito precisa colapsar melhor em breakpoints menores.

## Blocos e superfícies que faltam
- Matriz real de ações rápidas.
- Critério claro para responsividade e colapso de colunas.
- Priorização visual do header de conversa.

## Estrutura de refatoração sugerida
- Tratar Inbox como referência do design system operacional.
- Converter quick actions críticas para fluxos reais ou blocked.
- Criar contrato de colapso progressivo das colunas.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

# Audience

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Audience`.

## Rotas atuais
- /audience

## Rotas alvo
- /audience
- /audience/[segmentId]

## O que já está forte
- Boa leitura inicial de segmentos e métricas.
- Tema forte para CRM e growth.

## Gaps validados nesta rodada
- Ação primária não está suficientemente clara.
- Mistura segmento, funil e regras sem profundidade real.
- Drilldown de segmentos não validado.

## Blocos e superfícies que faltam
- Detalhe de segmento com membros, regras e uso.
- CTA forte para criar segmento.
- Histórico de crescimento e uso em campanhas/automações.

## Estrutura de refatoração sugerida
- Criar `AudienceSegmentRow`, `AudienceFunnelPanel`, `SegmentRulePreview`.
- Separar overview de construtor/detalhe.
- Preparar list/detail/new/edit.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

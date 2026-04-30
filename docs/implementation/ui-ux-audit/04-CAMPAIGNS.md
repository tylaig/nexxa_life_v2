# Campaigns

## Arquivos analisados
- `app/(app)/campaigns/page.tsx`
- `components/campaigns/campaigns-list-view.tsx`

## Objetivo operacional
- Operar campanhas outbound e acompanhar catálogo ativo.
- Usuário: marketing, CRM, growth e operação comercial.
- Ação primária: criar, filtrar, revisar performance e abrir detalhe/edição.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 3/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página já está acima de simples mock, com dados carregados por API e tabela funcional. Ainda assim, parece mais catálogo administrativo do que superfície de growth operacional. Faltam métricas de performance por campanha, sinais de erro/pausa/risco e uma CTA de criação com contexto melhor.

## Problemas encontrados
- Nomeclatura mistura PT-BR e EN.
- Pouca leitura de performance por campanha.
- Linhas ainda secas para operação real.
- Filtros avançados são superficiais.
- Falta destaque para campanhas críticas ou inválidas.
- Empty/error states ainda básicos.

## Melhorias recomendadas
### Quick wins
- Padronizar idioma da página.
- Destacar campanhas pausadas, com erro ou agenda crítica.
- Incluir métricas inline: entrega, leitura, resposta, conversão.
- Melhorar CTA “Nova campaign”.

### Estruturais
- Transformar tabela em superfície de growth operacional.
- Criar inspector/detalhe lateral resumido.
- Adicionar filtros por objetivo, canal, audiência e saúde.
- Criar blocos de destaque para campanhas com atenção.

### Novas superfícies
- `/campaigns/performance`
- `/campaigns/[id]/insights`
- `/campaigns/audiences`

## Refatoração sugerida
- Extrair `CampaignStatusPill`, `CampaignPerformanceInline`, `CampaignFiltersBar`, `CampaignInspectorPanel`.
- Separar métricas resumidas em view-model.
- Unificar padrões de lista com automations/templates.

## Plano de implementação
1. Padronizar linguagem e sinais de status.
2. Enriquecer cada linha com métricas úteis.
3. Evoluir filtros e estados.
4. Criar inspector resumido.
5. Preparar profundidade de detalhe.

## Critérios de aceite
- Operador entende quais campanhas exigem ação.
- A listagem comunica performance sem abrir detalhe.
- A página parece growth operacional, não apenas catálogo.

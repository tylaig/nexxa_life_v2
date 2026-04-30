# AI Studio

## Arquivos analisados
- `app/(app)/ai-studio/page.tsx`
- `components/ai-studio/ai-studio-hub-view.tsx`
- `components/ai-studio/ai-studio-shell-view.tsx`

## Objetivo operacional
- Apresentar roster de agentes e arquitetura ativa da malha de IA.
- Usuário: AI ops, liderança de produto/IA e operações técnicas.
- Ação primária: entender status dos agentes e abrir detalhe/configuração.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A tela já transmite bem a ideia de hub de agentes, com roster, segmentação por status e superfícies relacionadas. Ainda assim, há risco de ficar conceitual demais. Falta concretude operacional sobre governança, risco, bindings e diferença entre live, shadow e draft.

## Problemas encontrados
- Diferenças entre live/shadow/draft ainda pouco dramáticas.
- Métricas por agente úteis, mas superficiais para decisão.
- Governança, tools e risco aparecem pouco.
- Leitura rápida do topo ainda conceitual.
- Falta empty states e health operacional mais explícitos.

## Melhorias recomendadas
### Quick wins
- Reforçar status visual de live/shadow/draft.
- Destacar risco, bindings e criticidade por agente.
- Melhorar empty state de listas filtradas.

### Estruturais
- Criar summary executivo com posture/risk da malha.
- Enriquecer cards com governança, tools e handoff.
- Preparar detalhe mais forte por agente.
- Separar melhor visão de roster e arquitetura.

### Novas superfícies
- `/ai-studio/agents`
- `/ai-studio/agents/[id]/governance`
- `/ai-studio/architecture`

## Refatoração sugerida
- Extrair `AgentStatusPill`, `AgentGovernanceCard`, `AgentMetricsGrid`, `AiStudioSummaryPanel`.
- Separar dados do roster e arquitetura em subviews.
- Criar helpers para riscos e readiness.

## Plano de implementação
1. Reforçar leitura dos status.
2. Melhorar cards dos agentes.
3. Criar summary da malha ativa.
4. Preparar profundidade de detalhe.
5. Revisar responsividade.

## Critérios de aceite
- Diferenças entre live/shadow/draft são óbvias.
- O operador entende rapidamente o estado da malha de IA.
- A tela parece acionável, não apenas conceitual.

# AI Studio

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `AI Studio`.

## Rotas atuais
- /ai-studio
- /ai-studio/agents
- /ai-studio/agents/new
- /ai-studio/agents/[agentId]
- /ai-studio/agents/[agentId]/edit
- /ai-studio/skills (parcial)
- /skills (legado)
- /knowledge (legado)

## Rotas alvo
- /ai-studio
- /ai-studio/agents
- /ai-studio/knowledge
- /ai-studio/skills
- /ai-studio/integrations
- /ai-studio/evals
- /ai-studio/guardrails
- /ai-studio/costs

## O que já está forte
- Boa narrativa visual e boa base para hub.
- Lista de agentes e detalhe já existem.

## Gaps validados nesta rodada
- Visão atual ainda fragmentada por namespace.
- Cards da overview não estão fechando bem o loop.
- Falta governança operacional e leitura de custo/execução por agente.

## Blocos e superfícies que faltam
- Tabs persistentes.
- Comparação de agentes.
- Triggers, custos, execuções, histórico, guardrails, evals.

## Estrutura de refatoração sugerida
- Prioridade máxima da rodada.
- Transformar agentes em blocos horizontais ricos.
- Criar `AiStudioTabsShell`, `AgentOperationalRow`, `AgentCostPanel`, `AgentExecutionHistory`.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

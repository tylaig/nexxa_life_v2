# Omnichannel Commerce Automation Platform 2026

## Visão geral

Este pacote documenta uma **plataforma completa de atendimento, automação e IA para e-commerce**, combinando:

- **caixa de mensagens compartilhada** no estilo **Chatwoot + Intercom**
- **integração oficial com WhatsApp Business Platform** via **Cloud API, Graph API e Webhooks**
- **automações low-code/no-code** para fluxos comerciais e operacionais
- **IA conversacional e copilotos internos**
- **RAG** com base de conhecimento, catálogo, políticas, pedidos e contexto do cliente
- **módulos próprios para e-commerce**, com foco em operações como **Games Safari**, **Game Box** e negócios semelhantes

## Objetivo

Criar uma solução de mercado que permita a marcas e operadores centralizar atendimento, vendas, recuperação, retenção e suporte em uma única plataforma, com governança, analytics, templates Meta, automações, agentes de IA e integrações de dados.

## Estrutura dos documentos

- `PRD.md` — documento principal do produto
- `DESIGN_AND_UX.md` — sistema de produto, UX, information architecture e padrões de interface
- `ARCHITECTURE.md` — arquitetura técnica, serviços, integrações e decisões estruturais
- `MODULES_AND_FLOWS.md` — módulos, jornadas e fluxos operacionais
- `AI_RAG_AUTOMATION.md` — IA, RAG, automações, copilotos e agentes
- `DATA_AND_INTEGRATIONS.md` — modelo conceitual de dados, integrações e eventos
- `ROADMAP_AND_GTM.md` — roadmap, priorização e estratégia comercial/go-to-market
- `MARKET_POSITIONING_2026.md` — posicionamento competitivo e proposta de valor
- `implementation/campaigns-n8n-rag-skills-implementation.md` — blueprint de execução para Campaigns, n8n, RAG e AI Skills
- `implementation/phase1-foundations-execution-plan.md` — plano incremental da Fase 1
- `implementation/phase1-foundations-progress.md` — registro vivo do progresso da Fase 1
- `implementation/phase2-crud-and-persistence-plan.md` — plano incremental da Fase 2
- `implementation/phase2-progress.md` — registro vivo do progresso da Fase 2
- `implementation/phase3-ui-rag-plan.md` — plano incremental da Fase 3
- `implementation/phase3-progress.md` — registro vivo do progresso da Fase 3
- `implementation/phase3-gap-analysis.md` — análise do que falta e priorização da continuação
- `implementation/phase4-rag-plan.md` — plano incremental da Fase 4
- `implementation/phase4-progress.md` — registro vivo do progresso da Fase 4
- `implementation/phase4-gap-analysis.md` — gaps restantes e prioridade seguinte da Fase 4
- `implementation/phase41-chunks-plan.md` — plano incremental da Fase 4.1
- `implementation/phase41-progress.md` — registro vivo do progresso da Fase 4.1
- `implementation/phase41-gap-analysis.md` — gaps restantes e prioridade seguinte da Fase 4.1
- `implementation/phase42-supabase-vector-plan.md` — plano incremental da Fase 4.2
- `implementation/phase42-progress.md` — registro vivo do progresso da Fase 4.2
- `implementation/phase42-gap-analysis.md` — gaps restantes e prioridade seguinte da Fase 4.2
- `implementation/phase43-embeddings-retrieval-plan.md` — plano incremental da Fase 4.3
- `implementation/phase43-progress.md` — registro vivo do progresso da Fase 4.3
- `implementation/phase43-gap-analysis.md` — gaps restantes e prioridade seguinte da Fase 4.3
- `implementation/phase5-ui-ux-refactor-master-plan.md` — plano mestre de refatoração de páginas, fluxos e hierarquia de layouts
- `implementation/phase5-ui-ux-refactor-progress.md` — registro do planejamento e auditoria da Fase 5
- `implementation/phase5-ui-ux-refactor-gap-analysis.md` — gaps estruturais restantes e ordem recomendada de execução da Fase 5
- `implementation/phase5-frontend-first-refactor/README.md` — blueprint operacional completo da grande rodada frontend-first, com padrões globais, inventário de rotas, matriz de gaps, matriz de CTAs, higiene de código, loop de QA e planos por página
- `implementation/phase6-meu-dia-flow-root-adaptation-master-plan.md` — plano mestre para absorver todas as páginas e capacidades do `old/meu-dia-flow` na raiz atual, usando o design system e app shell oficiais
- `implementation/phase6-meu-dia-flow-root-adaptation-progress.md` — registro vivo da descoberta, mapeamento e execução da adaptação do domínio nexxa_life para a raiz atual
- `implementation/phase6-meu-dia-flow-root-adaptation-gap-analysis.md` — gaps estruturais, de navegação, domínio e QA para completar a migração nexxa_life -> app raiz
- `implementation/phase6-meu-dia-flow-route-mapping-matrix.md` — matriz operacional de mapeamento entre páginas legadas do nexxa_life flow, novas rotas da raiz e componentes-alvo do design atual

## Público deste pacote

- fundadores
- product managers
- UX/product designers
- tech leads / architects
- times de engenharia
- operação de atendimento
- sales/CS de implantação
- investidores ou parceiros estratégicos

## Premissas centrais

1. **Usar somente canais oficiais** quando envolver WhatsApp.
2. **Separar claramente inbox humano, automações e IA**.
3. **Tratar eventos de mensagem como base do produto**, não apenas tickets.
4. **Permitir operação enterprise e SMB**, com multi-tenant desde o início.
5. **Projetar para e-commerce**, não apenas suporte genérico.
6. **Combinar eficiência operacional com experiência premium** de atendimento.

## Resultado esperado

Ao final deste pacote, o time deve conseguir:

- validar o escopo do produto
- iniciar discovery técnico e comercial
- alinhar arquitetura base
- desenhar MVP e fases seguintes
- montar backlog de implementação
- apresentar a solução ao mercado de forma consistente

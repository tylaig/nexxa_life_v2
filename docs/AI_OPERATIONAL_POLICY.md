# Política Operacional de IA/RAG/Automação — Revisão Crítica

## 0. Objetivo

Transformar a camada de IA/RAG/automação em uma operação governável, auditável e executável para uma plataforma omnichannel focada em e-commerce/WhatsApp oficial.

Esta política consolida e operacionaliza o que está disperso em `AI_RAG_AUTOMATION.md`, `MODULES_AND_FLOWS.md`, `DATA_AND_INTEGRATIONS.md`, `PRD.md` e `ARCHITECTURE.md`.

---

## 1. Revisão crítica da proposta atual

## 1.1 Pontos fortes já bem definidos

- visão correta de IA como camada transversal, não chatbot isolado
- arquitetura event-first e conversation-centric consistente com o produto
- preocupação explícita com RAG grounded, citações, confiança e fallback humano
- separação macro entre inbox, automações, IA/RAG e integrações de comércio
- foco inicial em casos de uso de ROI alto: pré-venda, carrinho, pagamento, pós-venda, suporte

## 1.2 Lacunas operacionais relevantes

### A. Separação de responsabilidades ainda está implícita
Os documentos descrevem capacidades, mas não definem claramente quem faz o quê entre:
- humano
- automação determinística
- IA assistiva
- IA autônoma
- integrações de negócio

Sem isso, o produto tende a misturar “sugestão”, “decisão” e “execução”, o que aumenta risco operacional.

### B. Política de autonomia ainda é genérica
Os níveis 0–4 estão corretos como framework, mas faltam critérios executáveis:
- quais intents podem rodar em cada nível
- quais dados precisam existir para autorizar ação
- thresholds mínimos de confiança
- quando exigir double-check ou aprovação humana
- quais ações são sempre proibidas

### C. RAG está bem posicionado, mas ainda pouco operacionalizado
Faltam definições práticas para:
- taxonomia obrigatória de documentos
- versionamento e validade temporal de políticas
- prioridade entre fonte estruturada e não estruturada
- regras de blocking quando não houver grounding suficiente
- processo de ingestão, revisão, publicação e expiração

### D. Automação e IA ainda não estão explicitamente desacopladas
Em vários trechos, “automação” e “IA” aparecem no mesmo fluxo sem regra de precedência. Isso cria ambiguidade sobre quando usar:
- regra determinística
- consulta a dados transacionais
- RAG
- geração por LLM

A ordem precisa ser: dados operacionais e regras primeiro; LLM por último.

### E. Handoff humano está conceitualmente correto, mas incompleto como operação
Há menção a resumo, motivo e fontes, mas faltam:
- filas de exceção por tipo de risco
- SLA de handoff por criticidade
- payload mínimo entregue ao humano
- motivos padronizados de escalonamento
- política de retomada ou devolução ao bot

### F. Telemetria de IA está subespecificada
Os documentos citam métricas gerais, mas faltam:
- métricas por decisão de autonomia
- tracing por execução IA→RAG→ação
- taxonomia de incidentes de alucinação
- review sampling de respostas autônomas
- scorecards por tenant, fluxo e política

## 1.3 Riscos de produto se nada disso for fechado

- promessa comercial de “IA resolve” sem base para governança real
- mistura entre chatbot, workflow engine e copiloto no mesmo plano de controle
- respostas inconsistentes entre política comercial, pedido e mensagem enviada
- automações difíceis de auditar em casos de cancelamento, reembolso e atraso
- risco reputacional com WhatsApp oficial por mensagens incorretas, excessivas ou fora de política

---

## 2. Modelo operacional alvo: separação clara de camadas

## 2.1 Atendimento humano
Responsável por julgamento, negociação, exceção e accountability final.

Pode:
- responder qualquer caso dentro das permissões
- aprovar/rejeitar sugestões da IA
- assumir casos escalados
- autorizar ações excepcionais conforme alçada
- editar resposta antes do envio

Nunca deve depender exclusivamente da IA para:
- política comercial não documentada
- decisão financeira fora de regra
- promessa de prazo sem confirmação

## 2.2 Automação determinística
Responsável por regras previsíveis orientadas a evento.

Pode:
- disparar mensagens transacionais aprovadas
- mover conversa de fila
- aplicar tags/atributos
- aguardar janelas e branching simples
- chamar integrações para leitura/escrita controlada

Deve ser usada antes da IA quando houver:
- regra clara de negócio
- evento confiável do e-commerce
- template aprovado
- ação com comportamento totalmente previsível

## 2.3 IA assistiva
Responsável por ajudar humano, sem autonomia de execução externa.

Pode:
- resumir conversa
- sugerir resposta
- traduzir/rewrite
- classificar intenção, urgência, sentimento, risco
- sugerir next best action
- explicar motivo de falha de fluxo

Não pode:
- enviar automaticamente mensagem de risco médio/alto
- acionar compensação
- alterar pedido/pagamento/logística
- inventar política

## 2.4 IA autônoma
Responsável por responder ou orquestrar apenas dentro de limites explícitos.

Pode:
- responder intents de baixo risco com grounding suficiente
- coletar dados faltantes
- executar fluxos fechados e reversíveis
- abrir handoff com contexto consolidado

Só pode atuar quando simultaneamente:
- intent estiver na allowlist de autonomia
- fontes aprovadas estiverem disponíveis
- confiança/classificação superarem threshold
- ação for permitida pela política do tenant
- logs e tracing estiverem ativos

## 2.5 Integrações de negócio
Responsáveis por sistema de registro e verdade operacional.

Exemplos:
- Shopify/WooCommerce/VTEX/Nuvemshop
- ERP/CRM/WMS/gateway de pagamento
- Meta/WhatsApp Cloud API

Princípios:
- integração não “pede opinião” ao LLM para validar fato transacional
- pedido, pagamento, envio, estoque e template status vêm da integração
- a IA apenas interpreta ou comunica, nunca substitui a fonte de verdade

---

## 3. Política executável de autonomia

## 3.1 Matriz de níveis

### Nível A0 — sem IA
Uso:
- mensagens puramente transacionais
- notificações obrigatórias
- roteamento fixo
- ações reguladas por regra simples

Exemplos:
- pedido confirmado
- pagamento aprovado
- objeto entregue

### Nível A1 — IA sugere, humano decide
Uso:
- pré-venda consultiva
- suporte com nuance
- objeções comerciais
- temas com interpretação livre

Exemplos:
- recomendação de produto
- resposta sobre compatibilidade
- explicação de atraso com contexto

### Nível A2 — IA responde intents low-risk
Condições mínimas:
- intent na allowlist
- grounding com pelo menos 1 fonte aprovada ou dado estruturado
- confiança >= 0,80
- sem pedido de exceção financeira/comercial

Exemplos:
- política de troca padrão
- prazo de envio baseado em política publicada
- status de pedido consultado em integração
- horário de atendimento

### Nível A3 — IA resolve caso limitado com ação reversível
Condições mínimas:
- fluxo fechado e conhecido
- dados operacionais presentes
- confiança >= 0,88
- guardrail de valor/alçada aprovado
- ação auditável e reversível

Exemplos:
- reenviar link de pagamento
- coletar dados para troca/devolução
- abrir ticket de incidente logístico
- atualizar tag/status interno

### Nível A4 — IA orquestra workflow com approval gates
Condições mínimas:
- workflow versionado e homologado
- risco classificado como baixo ou médio-controlado
- etapas críticas exigem aprovação humana ou política assinada
- observabilidade ponta a ponta ativa

Exemplos:
- jornada de recuperação de pagamento com branching
- suporte automatizado com coleta, validação e handoff inteligente
- follow-up de entrega atrasada com regras por SLA

## 3.2 Tabela de decisão por categoria

| Categoria | Default | IA pode responder sozinha? | IA pode executar ação? | Aprovação humana? |
|---|---|---|---|---|
| FAQ institucional | A2 | Sim | Não | Não |
| Política de troca/devolução padronizada | A2 | Sim | Não | Não |
| Status de pedido/pagamento/envio | A2 | Sim | Não | Não |
| Reenvio de link/segunda via | A3 | Sim | Sim, se fluxo aprovado | Não |
| Coleta de dados para suporte | A3 | Sim | Sim | Não |
| Recomendação de produto | A1 | Não, por default | Não | Sim |
| Atraso crítico/incidente logístico | A1 | Não, por default | Não | Sim |
| Cancelamento/reembolso | A1/A3 | Só se regra determinística fechada | Limitado | Frequentemente sim |
| Compensação/cupom/bonificação | A1 | Não | Não, salvo regra de alçada | Sim |
| Alteração sensível de pedido | A1 | Não | Não, salvo workflow rígido | Sim |
| Temas legais/LGPD/fraude | A0/A1 | Não | Não | Sim |

## 3.3 Guardrails mandatórios

Proibido para IA autônoma:
- inventar política, preço, prazo, estoque ou cobertura de garantia
- oferecer compensação fora de matriz aprovada
- alterar ou cancelar pedido sem regra explícita e trilha auditável
- responder com baixa confiança em intent crítica
- usar fonte expirada, não publicada ou de outro tenant
- ignorar status real vindo de integração operacional

Obrigatório antes de qualquer resposta autônoma:
- verificar tenant/brand/channel/locale
- buscar contexto operacional aplicável
- verificar política de autonomia do intent
- anexar source map interno
- registrar confidence, policy version e retrieval log

## 3.4 Thresholds recomendados

- classificação de intent para autonomia: >= 0,85
- grounding mínimo para resposta low-risk: >= 1 fonte aprovada e score agregado >= 0,75
- grounding mínimo para política crítica: >= 2 evidências compatíveis ou 1 fonte estruturada autoritativa
- bloqueio automático se confiança global < 0,80
- escalonamento automático se conflito entre fonte estruturada e não estruturada

Observação: thresholds devem ser calibrados por tenant vertical, mas o produto precisa nascer com defaults globais.

---

## 4. Casos de uso prioritários

## 4.1 Prioridade P0 — lançar primeiro

### 1. Suporte transacional com status de pedido
Motivo:
- alta frequência
- baixo risco se apoiado em integração
- alto potencial de deflexão

Capacidade alvo:
- responder “onde está meu pedido?”
- informar status, rastreio, atraso e próxima etapa
- abrir exceção para atraso crítico

Autonomia recomendada:
- resposta: A2
- abertura de exceção: A3

### 2. Política de troca/devolução/garantia
Motivo:
- alto volume e repetição
- fortemente dependente de policy grounding

Capacidade alvo:
- explicar política vigente
- coletar dados mínimos
- encaminhar caso fora da regra

Autonomia recomendada:
- explicação padrão: A2
- abertura de solicitação: A3
- exceções: A1

### 3. Falha de pagamento
Motivo:
- impacto direto em receita
- fluxo relativamente padronizável

Capacidade alvo:
- identificar motivo conhecido
- reenviar link
- orientar método alternativo permitido
- escalar objeção humana

Autonomia recomendada:
- comunicação padrão: A3
- negociação/comercial: A1

### 4. Carrinho abandonado
Motivo:
- ROI claro
- fluxo mais automação do que IA

Capacidade alvo:
- trigger por evento
- template aprovado
- personalização limitada
- handoff opcional para vendedor

Autonomia recomendada:
- automação determinística + IA assistiva opcional
- evitar IA livre no primeiro envio

### 5. Triagem inbound + handoff inteligente
Motivo:
- reduz TMA e melhora roteamento

Capacidade alvo:
- classificar intenção/urgência/idioma/VIP
- coletar dados iniciais
- encaminhar para fila correta

Autonomia recomendada:
- classificação: A1/A2 interno
- resposta inicial de coleta: A2/A3

## 4.2 Prioridade P1 — após estabilização

- recomendação assistida de produto/alternativa
- atraso logístico com playbooks por risco
- resumo automático para agentes e supervisores
- copiloto de exceção operacional
- detecção de churn/insatisfação para intervenção humana

## 4.3 Não priorizar no MVP

- IA livre para venda consultiva complexa
- compensação autônoma
- alteração autônoma de pedido com impacto financeiro
- campanhas promocionais com geração livre de texto em escala

---

## 5. Política de grounding, RAG e ingestão

## 5.1 Ordem obrigatória de grounding

Toda execução de IA deve seguir esta ordem:

1. contexto da conversa
2. contexto operacional estruturado
   - pedido
   - pagamento
   - envio
   - cliente
   - consentimento
3. políticas estruturadas aprovadas
4. base textual versionada
5. snippets/respostas aprovadas
6. geração do LLM

Regra: se a resposta puder ser satisfeita por dado estruturado + template aprovado, não usar geração livre como mecanismo principal.

## 5.2 Taxonomia obrigatória de fonte

Toda fonte ingerida deve ter, no mínimo:
- tenant_id
- brand
- locale
- channel_scope
- source_type (`policy`, `faq`, `catalog`, `manual`, `script`, `snippet`, `legal`, `operational`)
- authority_level (`authoritative`, `approved`, `draft`, `deprecated`)
- owner_team
- version
- valid_from
- valid_to opcional
- pii_flag
- publish_status

Sem esses metadados, a fonte não pode entrar em produção de RAG.

## 5.3 Hierarquia de confiança de fontes

Ordem de prioridade:
1. dados estruturados transacionais da integração
2. política estruturada publicada e vigente
3. snippets/respostas aprovadas
4. FAQ/documentação publicada
5. conteúdo draft ou interno não publicado

Regras:
- fonte draft nunca serve resposta autônoma
- conflito entre fontes de níveis diferentes deve favorecer a mais autoritativa
- conflito material gera escalonamento

## 5.4 Pipeline de ingestão executável

### Etapa 1 — ingestão
Entradas:
- PDF
- DOC
- URL
- planilha/catálogo
- política interna
- snippets aprovados
- export de FAQ

### Etapa 2 — normalização
- extração de texto
- limpeza de boilerplate
- separação por seção semântica
- identificação de idioma
- detecção básica de PII/sensibilidade

### Etapa 3 — enriquecimento
- atribuir taxonomia obrigatória
- detectar temas/intents relacionados
- mapear produtos/SKUs/categorias citados
- vincular owner e validade

### Etapa 4 — chunking
Regras recomendadas:
- chunk semântico por seção/tópico, não por tamanho fixo puro
- 300–800 tokens por chunk como faixa inicial
- overlap apenas quando necessário
- preservar título, subtítulo e identificador da política

### Etapa 5 — indexação
- embeddings por chunk
- filtros estruturados por tenant/brand/locale/channel/source_type/version
- hash do conteúdo para deduplicação
- trilha do documento original e revisão

### Etapa 6 — revisão/publicação
- status inicial: draft
- revisão por owner humano
- publish explícito
- invalidação da versão anterior quando aplicável

### Etapa 7 — monitoramento contínuo
- documentos mais acionados
- queries sem resposta grounded
- fontes contraditórias
- chunks com baixa utilidade
- necessidade de reindex por mudança de política

## 5.5 Query plan operacional

Para cada pergunta/resposta:

1. classificar intent
2. detectar risco do intent
3. puxar contexto operacional se houver entidade relacionada
4. selecionar filtros de tenant/brand/channel/locale
5. recuperar top-k híbrido (vetorial + lexical + filtros)
6. reranquear com foco em autoridade e atualidade
7. montar evidence pack curto
8. decidir:
   - responder
   - pedir mais dados
   - escalar
9. gerar resposta com citações internas e rationale estruturado
10. logar retrieval, decisão e resultado

## 5.6 Blocking rules de RAG

Bloquear resposta autônoma quando:
- não houver fonte aprovada suficiente
- a política estiver expirada ou em draft
- houver conflito entre pedido real e texto da base
- a pergunta exigir exceção comercial não documentada
- houver baixa confiança de intent ou entidade

Fallbacks permitidos:
- pedir dado faltante
- enviar resposta segura e limitada
- transferir para humano com resumo

---

## 6. Catálogo de workflows prioritários

## 6.1 WF-01 Inbound triage
Trigger:
- `message.received`

Passos:
1. enrich contato
2. classificar intent/idioma/urgência/VIP
3. consultar pedido ativo se houver sinal
4. aplicar fila/prioridade
5. enviar resposta inicial permitida
6. abrir handoff se fora da política

KPIs:
- acurácia de roteamento
- tempo até primeiro owner
- taxa de handoff correto

## 6.2 WF-02 Order status self-serve
Trigger:
- pergunta sobre pedido ou `order.updated`

Passos:
1. identificar pedido
2. consultar integração
3. mapear status para playbook
4. responder com template/contexto
5. se atraso crítico, abrir exceção

KPIs:
- containment rate
- taxa de erro factual
- SLA de exceção logística

## 6.3 WF-03 Returns/exchange intake
Trigger:
- intenção de troca/devolução

Passos:
1. confirmar elegibilidade por política e pedido
2. coletar motivo e evidências
3. abrir solicitação/ticket
4. informar próximos passos
5. escalar exceções

KPIs:
- % intake automatizado
- taxa de retrabalho humano
- incidentes de política incorreta

## 6.4 WF-04 Payment recovery
Trigger:
- `payment.failed`

Passos:
1. segmentar motivo
2. checar elegibilidade e janela
3. reenviar link/instrução
4. follow-up programado
5. escalar objeções ou suspeita de fraude

KPIs:
- recovery rate
- tempo até recuperação
- taxa de escalonamento

## 6.5 WF-05 Abandoned cart
Trigger:
- `cart.abandoned`

Passos:
1. validar consentimento e elegibilidade
2. aguardar janela
3. enviar template aprovado
4. branch por clique/resposta
5. opcional: vendedor assume lead quente

KPIs:
- taxa de recuperação
- opt-out/complaints
- conversão por template

## 6.6 WF-06 Delay exception management
Trigger:
- `shipment.delayed` ou pergunta sobre atraso

Passos:
1. validar atraso real na integração
2. classificar criticidade
3. comunicar status e expectativa permitida
4. abrir fila especializada se crítico
5. sugerir compensação apenas para humano dentro da alçada

KPIs:
- tempo de comunicação do atraso
- CSAT pós-incidente
- incidentes por promessa incorreta

## 6.7 WF-07 Agent copilot
Trigger:
- conversa aberta ou resposta digitada

Passos:
1. resumir histórico
2. recuperar contexto e fontes
3. sugerir resposta
4. sugerir próxima ação
5. registrar aceite/edição/rejeição

KPIs:
- acceptance rate
- tempo economizado por agente
- qualidade percebida

---

## 7. Handoff humano operacional

## 7.1 Motivos padronizados de handoff

- baixa confiança de intent
- grounding insuficiente
- conflito de fontes
- exceção comercial
- risco jurídico/LGPD/fraude
- cliente VIP/alto valor
- sentimento crítico/churn
- pedido com incidente operacional grave
- pedido explícito de humano

## 7.2 Payload mínimo do handoff

Toda transferência deve carregar:
- resumo da conversa
- intent estimado
- risco do caso
- dados do contato
- pedido/pagamento/envio vinculados
- ações já executadas
- perguntas já feitas ao cliente
- fontes consultadas
- motivo do handoff
- sugestão de próxima ação
- confidence score
- policy version aplicada

## 7.3 Filas de destino recomendadas

- pré-venda
- pós-venda geral
- logística/atraso
- troca/devolução
- pagamento
- VIP/high value
- risco/fraude
- compliance/LGPD

## 7.4 SLA de handoff

Sugestão inicial:
- crítico: atendimento humano em até 5 min
- alto: até 15 min
- médio: até 1 h
- baixo: fila normal

## 7.5 Regra de retorno ao bot

Só retornar automação ao fluxo quando:
- humano resolver exceção
- novo estado permitir resposta padronizada
- caso for explicitamente reclassificado para intent de baixo risco

---

## 8. Riscos, controles e telemetria

## 8.1 Riscos principais

### Operacionais
- resposta factualmente errada sobre pedido/pagamento/envio
- ação automatizada indevida
- handoff tardio em caso crítico

### Comerciais
- promessa não suportada
- compensação fora da política
- experiência ruim em lead de alto valor

### Compliance
- uso indevido de PII
- resposta incompatível com LGPD/consentimento
- comunicação fora das regras do canal

### Técnicos
- falha de integração tratada como verdade parcial
- drift de qualidade do modelo
- index desatualizado ou contaminado

## 8.2 Controles mandatórios

### Preventivos
- allowlist de intents autônomos
- denylist de ações proibidas
- source publish workflow
- RBAC para publicar políticas/fluxos
- circuit breaker de integração
- redaction/masking de PII onde aplicável

### Detectivos
- logging de prompt/retrieval/answer/action
- diff entre resposta enviada e fonte
- alarmes de baixa grounding rate
- detecção de conflito entre políticas
- sampling de casos autônomos para QA humana

### Corretivos
- kill switch por tenant/fluxo/modelo
- rollback de versão de workflow/política
- replay controlado de eventos
- reassign massivo para fila humana em incidente

## 8.3 Telemetria mínima por execução de IA

Campos obrigatórios:
- tenant_id
- workspace_id
- conversation_id
- message_id/event_id
- workflow_id/version quando aplicável
- policy_level aplicado
- intent
- risk_class
- model/provider/version
- prompt_profile
- retrieval_sources ids
- confidence scores
- decision (`suggest`, `auto_reply`, `auto_action`, `handoff`, `blocked`)
- external actions executadas
- latency e token/cost metrics
- user outcome final

## 8.4 KPIs operacionais de IA

### Qualidade
- grounded answer rate
- hallucination incident rate
- factual error rate por categoria
- acceptance/edit rate de sugestões

### Autonomia
- containment rate por intent
- escalation rate por intent
- auto-action success rate
- blocked-by-policy rate

### Negócio
- recovery de pagamento
- recovery de carrinho
- conversão assistida
- CSAT por camada: humana vs IA

### Governança
- % respostas autônomas com source pack válido
- % fontes expiradas acionadas indevidamente
- tempo para rollback de política
- incidentes por tenant/modelo/workflow

## 8.5 Processo de QA recomendado

- 100% review nos primeiros 14 dias de cada fluxo autônomo novo
- depois, sampling contínuo de 5–10% por intent
- review obrigatório de todo incidente crítico
- scorecard mensal por tenant:
  - intents mais automatizados
  - intents com mais falha factual
  - gaps de conhecimento
  - oportunidades de converter A1 em A2/A3 ou reduzir autonomia

---

## 9. Regras de implementação recomendadas

## 9.1 Precedência do motor de decisão

A plataforma deve decidir nesta ordem:
1. policy hard block
2. regra determinística do workflow
3. consulta a integração operacional
4. RAG
5. geração LLM
6. handoff

Não inverter essa ordem.

## 9.2 Plano de lançamento seguro

### Fase 1
- A1 amplo para copiloto
- A2 apenas para FAQ/política/status de pedido
- A3 apenas para reenvio de link e intake de suporte simples

### Fase 2
- expandir A3 para trocas/devoluções padronizadas
- ativar supervisor AI para filas e gargalos
- calibrar thresholds por tenant

### Fase 3
- A4 em workflows homologados com approval gates
- scorecards e tuning automáticos por política

## 9.3 Ownership organizacional

- Produto: define catálogo de casos de uso e níveis de autonomia
- Operações/CS: aprova playbooks, filas e handoff
- Comercial/e-commerce: aprova mensagens e políticas comerciais
- Compliance/segurança: aprova temas críticos e retenção
- Knowledge owner: publica e versiona fontes
- Engenharia: garante tracing, policy engine, rollback e isolamento multi-tenant

---

## 10. Decisões objetivas recomendadas

1. Tratar IA assistiva e IA autônoma como produtos separados no controle de política.
2. Implementar policy engine explícito por intent/ação, não só prompt engineering.
3. Tornar dados estruturados e integrações a fonte primária de verdade; RAG complementa.
4. Restringir autonomia inicial aos casos com alto volume, baixo risco e alto grounding.
5. Exigir taxonomia, versionamento e publicação formal para qualquer fonte usada por RAG.
6. Instituir handoff padronizado com payload mínimo e SLA por criticidade.
7. Medir IA por decisão e resultado, não apenas por volume de uso.
8. Incluir kill switch por tenant/fluxo/modelo desde o MVP.

---

## 11. Conclusão executiva

A direção estratégica dos documentos é forte, mas ainda falta um sistema operacional claro para IA. O principal ajuste é sair de uma descrição de capacidades para uma política executável baseada em:
- separação de camadas
- matriz de autonomia por intent/ação
- grounding obrigatório e hierarquia de fontes
- workflows versionados com guardrails
- handoff humano padronizado
- telemetria detalhada e rollback

Se essa política for adotada, a plataforma pode vender “IA operacional para comércio” com credibilidade real, evitando o risco clássico de prometer autonomia onde ainda só existe geração de texto.
# Roadmap Técnico de Implementação v2

## Objetivo
Definir a ordem de implementação recomendada para a atualização v2 do produto, considerando:

- redução de retrabalho
- dependências entre frentes
- coerência de shell/layout
- alinhamento com a nova arquitetura de Apps, Canais, Produtos, AI Studio, Audience e Dashboard
- diretrizes globais de UX e layout

---

# Regra crítica antes de executar

Este roadmap **não substitui** a leitura dos arquivos específicos da pasta:

`/home/tylaig/repo/chat.meusuper.app/docs/implementation/ui-ux-audit-v2/`

Para cada etapa do roadmap:
- leia este roadmap
- leia o master prompt consolidado v2
- leia os arquivos específicos relevantes da frente
- só então implemente

---

# Princípio central do roadmap

A ordem foi pensada para evitar este erro comum:
- mexer nas páginas antes de fixar shell/layout/componentes compartilhados
- refatorar domínios antes de consolidar a arquitetura que eles dependem
- implementar superfícies isoladas antes da taxonomia principal do produto

Por isso a ordem abaixo prioriza primeiro:
1. base visual e estrutural
2. taxonomia e navegação
3. domínios transversais compartilhados
4. hubs principais
5. superfícies específicas

---

# Fase 0 — Consolidação de documentação e alinhamento

## Objetivo
Garantir que o time ou agente de implementação use corretamente a documentação v2.

## Tarefas
- [ ] Ler `00-MASTER-PROMPT-CONSOLIDATED-V2.md`
- [ ] Mapear todos os arquivos relevantes de `ui-ux-audit-v2`
- [ ] Validar conflitos e sobreposições entre prompts
- [ ] Transformar princípios globais em checklist operacional de implementação

## Resultado esperado
- visão consolidada
- linguagem comum
- critérios globais já entendidos

---

# Fase 1 — Shell, layout global e primitives compartilhadas

## Objetivo
Criar a base estrutural do produto antes de mexer nas páginas individuais.

## Arquivos-chave para ler
- `00-APP-SHELL-OPENAI-LIKE-CLARITY-PROMPT.md`
- `13-SETTINGS-AND-GLOBAL-LAYOUT-HIERARCHY-PROMPT.md`
- `00-OVERLAYS-MODALS-AND-INPUT-PRELOADING-PROMPT.md`

## Tarefas
- [ ] Refatorar sidebar
- [ ] Refatorar topbar
- [ ] Revisar `app/(app)/layout.tsx`
- [ ] Definir nova hierarquia global de layout
- [ ] Remover anti-pattern de duas colunas redundantes
- [ ] Abolir blocos de “resumo da IA” como padrão estrutural
- [ ] Criar primitives compartilhadas de layout
- [ ] Criar padrão de modal/drawer/dialog reutilizável
- [ ] Criar padrão de async input / preload / multiselect

## Resultado esperado
- base visual mais clara
- navegação consistente
- layout reutilizável
- menos retrabalho nas telas seguintes

---

# Fase 2 — Arquitetura de informação e taxonomia principal do produto

## Objetivo
Definir a organização global de superfícies antes das refatorações de domínio.

## Frentes críticas
- Apps
- Providers
- Channels
- Products
- AI Studio
- Knowledge
- Audience
- Settings

## Tarefas
- [ ] Auditar páginas atuais vs navegação lateral
- [ ] Decidir entradas principais e subitens
- [ ] Posicionar AI Studio corretamente
- [ ] Posicionar Products corretamente
- [ ] Definir onde Channels vive em Settings
- [ ] Consolidar transição de Integrations para Apps
- [ ] Definir relação Apps x Providers x Channels x Actions

## Resultado esperado
- árvore de navegação madura
- menos ambiguidades estruturais
- base pronta para domínios

---

# Fase 3 — Domínios transversais administrativos e de plataforma

## Objetivo
Resolver os domínios que serão usados por várias outras frentes.

## Arquivos-chave
- `13-CONTACT-FIELDS-AND-TAGS-SETTINGS-NEXT-WAVE-PROMPT.md`
- `08-PROVIDERS-REAL-CONFIGURATION-REUSABLE-MODAL-NEXT-WAVE-PROMPT.md`
- `13-CHANNELS-WHATSAPP-CLOUD-CONNECTION-NEXT-WAVE-PROMPT.md`
- `08-WEBHOOKS-ROBUST-EDITOR-DEBUG-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Estruturar Contact Fields
- [ ] Estruturar Tags
- [ ] Melhorar Settings como hub administrativo
- [ ] Estruturar Providers com auth variável
- [ ] Criar modal reutilizável de provider
- [ ] Estruturar Channels com WhatsApp Cloud inicial
- [ ] Estruturar Webhooks com debug/teste/bindings

## Resultado esperado
- base administrativa robusta
- plataformas de integração e canal prontas
- metadados de CRM mais sérios

---

# Fase 4 — Apps / Integrations / marketplace interno

## Objetivo
Convergir Integrações para Apps e alinhar toda a arquitetura conectável.

## Arquivos-chave
- `08-APP-STORE-PROVIDERS-ACTIONS-NEXT-WAVE-PROMPT.md`
- `08-INTEGRATIONS-TO-APPS-PREMIUM-HIERARCHY-NEXT-WAVE-PROMPT.md`
- `08-PROVIDERS-REAL-CONFIGURATION-REUSABLE-MODAL-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Transformar o conceito de catálogo em Apps
- [ ] Estruturar seeds nativas
- [ ] Expor actions/tools dos apps
- [ ] Conectar providers aos apps
- [ ] Implementar estados locked/coming soon
- [ ] Refatorar a tela atual de Integrations para Apps

## Resultado esperado
- hub de Apps premium
- base conectável real
- alinhamento com agentes, automações e canais

---

# Fase 5 — Dashboard + Analytics + foco em produtos digitais

## Objetivo
Fazer o Dashboard virar o hub analítico principal.

## Arquivos-chave
- `02-DASHBOARD-ANALYTICS-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Absorver Analytics no Dashboard
- [ ] Remover “Migrar bloco de analytics”
- [ ] Remover “Personalizar dashboard”
- [ ] Criar menu por domínio com ícones
- [ ] Integrar insights ao dashboard
- [ ] Adaptar métricas para produtos digitais
- [ ] Preparar suporte a eventos customizados/webhooks

## Resultado esperado
- dashboard central e maduro
- analytics menos fragmentado
- leitura forte de negócio digital

---

# Fase 6 — AI Studio + Knowledge

## Objetivo
Transformar AI Studio em studio real e Knowledge em infraestrutura moderna de grounding.

## Arquivos-chave
- `11-AI-STUDIO-AND-KNOWLEDGE-EXPANSION-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Expandir detalhe/config do agente
- [ ] Integrar tools/apps/voz/triggers/timing por agente
- [ ] Expandir Knowledge para URL/site/files/manual markdown
- [ ] Criar UX de scan/index/mock pipeline com progresso
- [ ] Conectar agentes às knowledge bases

## Resultado esperado
- AI Studio muito mais completo
- Knowledge mais rica e preparada para RAG real

---

# Fase 7 — Contacts + Audience + CRM structure

## Objetivo
Transformar contatos em base de CRM forte e criar Audience como módulo próprio.

## Arquivos-chave
- `03-CONTACTS-AUDIENCE-NEXT-WAVE-PROMPT.md`
- `13-CONTACT-FIELDS-AND-TAGS-SETTINGS-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Criar módulo Audience
- [ ] Evoluir Contacts para múltiplas visualizações
- [ ] Adicionar kanban
- [ ] Definir etapas/pipeline
- [ ] Criar filtros avançados
- [ ] Integrar tags e fields à segmentação
- [ ] Preparar funil por etapa/audiência

## Resultado esperado
- CRM mais real
- segmentação robusta
- base pronta para campanhas

---

# Fase 8 — Inbox

## Objetivo
Refinar a principal superfície operacional do produto com base já estabilizada.

## Arquivos-chave
- `01-INBOX-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Unificar IA + detalhes do contato
- [ ] Criar abas Detalhes / Histórico
- [ ] Melhorar scroll/responsividade
- [ ] Melhorar caixas/canais
- [ ] Criar nova conversa premium
- [ ] Criar modo foco/full screen
- [ ] Refinar ações da conversa

## Resultado esperado
- inbox mais premium
- produtividade maior
- melhor cockpit do contato

---

# Fase 9 — Products + Orders + Shopify

## Objetivo
Refletir o foco do produto em bens digitais.

## Arquivos-chave
- `12-PRODUCTS-SHOPIFY-DIGITAL-GOODS-NEXT-WAVE-PROMPT.md`
- `12-ORDERS-DIGITAL-GOODS-PREVIEW-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Criar módulo Products
- [ ] Integrar importação Shopify
- [ ] Tratar Shopify como fonte de catálogo
- [ ] Preparar domínio para entrega/acesso digital
- [ ] Refatorar Orders com foco em produto digital
- [ ] Melhorar preview do pedido com superfícies sob demanda

## Resultado esperado
- catálogo mais claro
- pedidos mais aderentes ao negócio digital

---

# Fase 10 — Logs + Storage

## Objetivo
Melhorar observabilidade e explorer de assets.

## Arquivos-chave
- `14-LOGS-CONSOLIDATED-FILTERS-DETAILED-NEXT-WAVE-PROMPT.md`
- `15-STORAGE-UNIFIED-ASSETS-EXPLORER-NEXT-WAVE-PROMPT.md`

## Tarefas
- [ ] Evoluir Logs com filtros robustos
- [ ] Criar multiselect dropdown
- [ ] Tornar Logs mais direto e objetivo
- [ ] Unificar Storage como explorer de assets
- [ ] Implementar preview de markdown/texto/imagem
- [ ] Expor assets acessíveis por agentes quando aplicável

## Resultado esperado
- observabilidade mais útil
- storage mais operacional

---

# Fase 11 — Revisão transversal de consistência

## Objetivo
Fechar a atualização v2 com coerência visual, funcional e arquitetural.

## Tarefas
- [ ] Revisar aderência aos princípios globais
- [ ] Eliminar remanescentes de layout redundante
- [ ] Revisar nomenclatura PT/EN
- [ ] Revisar locked states, loading states, empty states
- [ ] Revisar modais, drawers e async inputs em múltiplas telas
- [ ] Revisar sidebar final e páginas faltantes

## Resultado esperado
- produto mais coeso
- menos incoerências entre módulos
- percepção premium mais forte

---

# Dependências principais

## Dependências fortes
- Shell/layout antes das páginas
- Providers/Channels/Webhooks antes de Apps e integrações maduras
- Contact Fields/Tags antes de Audience madura
- Apps/Providers antes de AI Studio tools/apps completos
- Products antes de Orders realmente focados em catálogo digital
- Dashboard consolidado antes de ajustes finos de analytics distribuídos

---

# Ordem resumida recomendada

1. Shell + Layout + Primitives
2. Arquitetura de informação global
3. Settings + Contact Fields + Tags
4. Providers + Channels + Webhooks
5. Apps / Integrations
6. Dashboard + Analytics
7. AI Studio + Knowledge
8. Contacts + Audience
9. Inbox
10. Products + Orders
11. Logs + Storage
12. Revisão transversal final

---

# Observação final

Mesmo com este roadmap, a implementação correta ainda depende de analisar os arquivos específicos da pasta `ui-ux-audit-v2` para cada etapa.

Este roadmap organiza a execução. Ele não substitui o detalhamento das frentes.

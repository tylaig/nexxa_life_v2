# Phase 5 — Integrations refactor notes

## Objetivo consolidado
Refatorar `Integrations` em superfícies distintas e coerentes:

1. **Integrações do workspace**
   - conexões configuradas no workspace
   - nativas e custom claramente sinalizadas
   - health, status, testes, mappings e uso por agentes

2. **Providers**
   - catálogo técnico dos providers disponíveis
   - nativos e custom
   - schema de configuração
   - schema de input/output
   - auth mode
   - capacidades

3. **Mappings**
   - request/response mock
   - preview estilo curl/payload
   - mapeamento de resposta para campos internos

4. **Settings > Contact fields**
   - campos de contato como destino dos mappings
   - tipos configuráveis
   - flags de uso por agentes, automações, perfil 360 e integrações

## Requisitos adicionais registrados
- aba dedicada para `Providers`
- distinção clara entre `provider` e `workspace integration`
- formulários por schema com tipos string, number, boolean, select, textarea, password e json
- construção mock de request input
- retorno mock da integração
- mapping do retorno para campos internos
- limite configurável por integração nativa por workspace
- contador acumulado por integração sem limite horário neste primeiro momento
- cada integração precisa ser personalizável por workspace
- cada integração precisa expor ações/tools reutilizáveis em automações
- cada ação/tool precisa ter `input`, `output`, modelo JSON persistível e parser próprio
- salvar inputs executados no banco com estrutura JSON
- cada tool da integração precisa suportar `json parser`
- seleção de credenciais/providers de forma criptografada e segura
- página Home por workspace com updates, ações recomendadas, integrações e análises configuráveis
- menu do usuário flutuante no topo direito com avatar/inicial
- workspace switcher no lado esquerdo
- página `/logs` por workspace
- página `/storage` por workspace
- página/modal de visualização de pedido em `Pedidos`
- ação de chat em pedidos para detectar conversa ativa e navegar para a conversa
- toda conversa precisa ter link profundo/compartilhável
- remover botão `Novo pedido` e criar modal de filtros em pedidos
- nova superfície de `Webhook` para receber eventos externos
- página específica de webhook para mapeamento, teste, debug e ativação
- webhook deve permitir parser JSON e ativação de automações/ações específicas

## Modelagem adicional sugerida

### Native integration policy
- `maxConnectionsPerWorkspace?: number | null`
- `currentConnectionsCount: number`
- `usageCounter: number`
- sem rate limit por hora nesta fase
- preparada para rate limit futuro

### Integration actions / tools
Cada integração deve poder expor uma lista de ações executáveis por agentes e automações:

```ts
type IntegrationToolDefinition = {
  id: string
  integrationId: string
  key: string
  label: string
  description?: string
  inputSchema: IntegrationFieldDefinition[]
  outputSchema?: IntegrationFieldDefinition[]
  inputJsonExample?: Record<string, unknown>
  outputJsonExample?: Record<string, unknown>
  jsonParserStrategy?: "path" | "template" | "custom"
  credentialBindingMode?: "provider-default" | "workspace-selected"
  persistInputPayload?: boolean
}
```

### Credenciais
- provider pode expor múltiplas credenciais salvas
- integração escolhe uma credencial válida do provider
- credenciais devem ser tratadas como secret/server-only
- UI deve mostrar apenas metadata pública da credencial
- preparar suporte a rotação, status e escopo

### Persistência futura
- executions table para inputs/outputs por tool
- saved payload templates por integração
- mapping table para input/output transforms
- vínculo entre tool e nó de automação

## Próxima execução sugerida
1. seguir fechando a refatoração de `Settings`
   - melhorar páginas internas
   - completar superfícies administrativas faltantes
   - preparar `Contact Fields`
2. depois entrar pesado em `Integrations`
   - providers
   - workspace integrations
   - tools/actions
   - mappings
   - credenciais
   - limites/contadores
3. seguir com `Inbox`
   - refinando popups/ações/consistência
4. enfileirar próximos módulos adjacentes
   - pedidos: detail/chat link/filtros
   - webhook: mapeamento/teste/debug/ativação

## Atualização incremental — webhook inbound readiness
- criada superfície dedicada `/integrations/webhooks`
- adicionada leitura inicial de:
  - endpoints configurados
  - parser JSON
  - payload de teste
  - mapping source → target
  - teste/debug
  - ativação operacional
- integração da navegação principal de integrations com CTA para webhooks
- webhook permanece em estágio visual/mock, mas agora já se conecta conceitualmente a:
  - automações
  - tools/actions
  - contact fields
  - payload parser

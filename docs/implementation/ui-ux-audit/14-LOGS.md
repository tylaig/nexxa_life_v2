# Logs

## Arquivos analisados
- `app/(app)/logs/page.tsx`
- `components/logs/logs-overview-view.tsx`

## Objetivo operacional
- Investigar eventos, falhas e comportamento da operação.
- Usuário: suporte técnico, AI ops, engenharia aplicada e operações.
- Ação primária: filtrar, localizar e entender problemas relevantes.

## Scorecard
- Clareza operacional: 2/5
- Hierarquia visual: 3/5
- Escaneabilidade: 2/5
- Consistência: 3/5
- Estados operacionais: 1/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 2/5

## Resumo executivo
A tela já tem uma base coerente, mas ainda está muito rasa para troubleshooting real. Os filtros são simples demais, o feed é visualmente uniforme e falta expansão de contexto, payload, severidade e correlação.

## Problemas encontrados
- Clareza investigativa ainda baixa.
- Diferenciação visual por severidade é insuficiente.
- Feed uniforme demais.
- Não há expansão de payload/evento.
- Filtros e top summary ainda rasos.
- Empty states e busca sem resultado não aparecem de forma forte.

## Melhorias recomendadas
### Quick wins
- Reforçar níveis de severidade.
- Destacar erros críticos no topo.
- Melhorar busca e filtros por source/período/severidade.

### Estruturais
- Permitir expansão de evento/log payload.
- Criar correlação com fluxos e troubleshooting.
- Adicionar navegação para detalhe de log/evento.
- Extrair badges e feed items reutilizáveis.

### Novas superfícies
- `/logs/[id]`
- `/logs/explorer`
- `/logs/correlations`

## Refatoração sugerida
- Extrair `LogSeverityBadge`, `LogFeedItem`, `LogFiltersPanel`, `LogPayloadDrawer`.
- Transformar dados mock em modelo mais rico para inspeção.
- Separar summary/top alerts do feed.

## Plano de implementação
1. Melhorar severidade e summary.
2. Evoluir filtros.
3. Criar expansão de evento.
4. Preparar detalhe/correlação.
5. Revisar empty/error states.

## Critérios de aceite
- A tela ajuda investigação real.
- Erros e warnings importantes se destacam.
- O usuário consegue abrir contexto além da mensagem resumida.

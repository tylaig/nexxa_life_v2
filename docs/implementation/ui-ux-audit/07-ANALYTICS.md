# Analytics

## Arquivos analisados
- `app/(app)/analytics/page.tsx`
- `components/analytics/analytics-view.tsx`

## Objetivo operacional
- Consolidar leitura analítica de operação, receita, automação e IA.
- Usuário: liderança, operações, CRM, growth e produto.
- Ação primária: interpretar performance e tomar decisão com base em tendências.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 2/5
- Consistência: 3/5
- Estados operacionais: 1/5
- Responsividade: 2/5
- Acessibilidade: 2/5
- Escalabilidade frontend: 2/5

## Resumo executivo
A página é rica e ambiciosa, com múltiplos gráficos e boa cobertura temática. O risco é virar BI genérico: informação demais, pouca mediação operacional e grande carga cognitiva. Falta narrativa mais clara por aba e conexão mais forte entre headline KPIs, gráficos e decisões.

## Problemas encontrados
- Densidade visual alta.
- Muitas leituras competindo ao mesmo tempo.
- Poucos insights acionáveis entre charts.
- Aba por tema é correta, mas ainda exige síntese melhor.
- Responsividade dos gráficos tende a ser frágil.
- Falta estados de erro/loading/degraded evidentes.

## Melhorias recomendadas
### Quick wins
- Inserir resumos acionáveis no topo de cada aba.
- Reduzir sobrecarga inicial por aba.
- Revisar legendas, contraste e consistência de séries.
- Tornar filtro de período mais explícito no impacto sobre os dados.

### Estruturais
- Criar narrativa por aba com KPI headline + 2 ou 3 leituras secundárias.
- Inserir insight cards entre gráficos.
- Extrair subcomponentes por aba e por gráfico.
- Criar exportação/relatório com contexto.

### Novas superfícies
- `/analytics/reports`
- `/analytics/export`
- `/analytics/insights`

## Refatoração sugerida
- Dividir em componentes por aba: `OverviewTab`, `OperationTab`, `CommerceTab`, `AutomationTab`, `AiTab` já existem e devem ser externalizados.
- Criar wrappers de chart padronizados.
- Mover configs/datasets para arquivos de domínio.

## Plano de implementação
1. Reduzir carga cognitiva da visão geral.
2. Inserir insights e contexto por aba.
3. Externalizar subcomponentes.
4. Revisar responsividade e acessibilidade dos charts.
5. Adicionar estados operacionais.

## Critérios de aceite
- Cada aba responde uma pergunta clara.
- O usuário consegue agir a partir da leitura, não só observar gráficos.
- A página deixa de parecer BI genérico e fica mais produto operacional.

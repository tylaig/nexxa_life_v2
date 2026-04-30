# Dashboard

## Arquivos analisados
- `app/(app)/dashboard/page.tsx`
- `components/home/home-overview-view.tsx`

## Objetivo operacional
- Comunicar a leitura principal do workspace.
- Usuário: liderança, coordenação e operador que inicia o dia pela home.
- Ação primária: entender prioridades e seguir para a próxima ação relevante.

## Scorecard
- Clareza operacional: 2/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 1/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 2/5

## Resumo executivo
O dashboard está visualmente organizado, porém ainda tem forte caráter de vitrine: muitos cards, vários blocos informativos e pouca relação direta com urgência operacional. A personalização é promissora, mas ainda parece local/mock. Falta separar melhor visão executiva, visão operacional e ações imediatas.

## Problemas encontrados
- Competição visual entre KPIs, sinais, updates e atalhos.
- Filtros do topo parecem ilustrativos.
- Insights e ações recomendadas ainda são genéricos.
- Falta uma narrativa principal do dia/turno.
- Personalização sem persistência real.
- Muitos blocos parecem “promovíveis”, mas não necessariamente úteis na home.
- Ausência de loading/error/degraded claros.

## Melhorias recomendadas
### Quick wins
- Reduzir o número de blocos simultâneos acima da dobra.
- Destacar riscos, alertas e oportunidades antes dos KPIs decorativos.
- Transformar “ações recomendadas” em ações mais concretas.
- Revisar atalhos para tarefas de maior frequência.

### Estruturais
- Separar Dashboard em 3 zonas: saúde operacional, oportunidades, navegação executiva.
- Criar banner operacional no topo com pendências críticas.
- Diferenciar visão executiva vs visão operacional com tabs ou seções.
- Persistir personalização por workspace/usuário.
- Criar blocos que levem a decisão, não só leitura.

### Novas superfícies
- `/dashboard/customize`
- `/dashboard/alerts`
- `/dashboard/recommended-actions`

## Refatoração sugerida
- Extrair `KpiGrid`, `OperationalAlertBanner`, `RecommendedActionsCard`, `DashboardSectionCard`.
- Separar config de blocos em arquivo próprio.
- Mover estado de personalização para hook dedicado e storage persistido.
- Isolar datasets mock em view-models.

## Plano de implementação
1. Reorganizar prioridade acima da dobra.
2. Criar bloco operacional de alertas.
3. Melhorar ações recomendadas e atalhos.
4. Persistir personalização.
5. Revisar estados e responsividade.

## Critérios de aceite
- O dashboard responde “o que exige atenção agora?” em poucos segundos.
- O usuário distingue rapidamente leitura executiva de ação operacional.
- Filtros e personalização deixam de parecer mock.
- Há menos ruído e mais decisão.

# Settings

## Arquivos analisados
- `app/(app)/settings/page.tsx`
- `components/settings/settings-overview-view.tsx`

## Objetivo operacional
- Organizar o centro administrativo do workspace.
- Usuário: admin, onboarding, operações técnicas e liderança.
- Ação primária: navegar para configuração relevante com entendimento do estado atual.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 1/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página hoje é um hub de links bem organizado, mas ainda não um centro de configuração realmente informativo. Falta health por módulo, pendências de setup, próximos passos e distinção mais forte entre administração, conectividade e workspace.

## Problemas encontrados
- Hub de links com pouca informação de estado.
- Falta visão executiva do setup do workspace.
- Sem health ou pendências por módulo.
- CTAs com pouca hierarquia prática.
- Pouca sensação de guided setup.

## Melhorias recomendadas
### Quick wins
- Exibir status de configuração por card.
- Destacar pendências e próximos passos.
- Melhorar prioridade das CTAs.

### Estruturais
- Transformar a página em centro de configuração com resumo do workspace.
- Criar guided setup / onboarding infra.
- Separar visualmente administração, conectividade e operação.
- Incluir saúde e completude por módulo.

### Novas superfícies
- `/settings/setup`
- `/settings/health`
- `/settings/checklist`

## Refatoração sugerida
- Extrair `SettingsModuleCard`, `SetupProgressCard`, `WorkspaceHealthSummary`.
- Criar config-driven cards com estado dinâmico.
- Unificar grupos e seções em view-model.

## Plano de implementação
1. Adicionar status e pendências.
2. Criar resumo executivo do workspace.
3. Reorganizar grupos visuais.
4. Preparar guided setup.
5. Revisar linguagem e CTA.

## Critérios de aceite
- O usuário entende rapidamente o que falta configurar.
- A página deixa de ser só navegação e passa a ser centro informativo.
- Setup e saúde do workspace ficam visíveis.

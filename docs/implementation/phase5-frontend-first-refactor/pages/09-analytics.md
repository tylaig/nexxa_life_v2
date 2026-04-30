# Analytics

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Analytics`.

## Rotas atuais
- /analytics

## Rotas alvo
- /analytics

## O que já está forte
- Bom módulo de leitura e insight.
- Já serve de referência para tela analítica.

## Gaps validados nesta rodada
- Precisa confirmar consistência com padrão de tabs por domínio.
- Há sinais de comentários editoriais extensos no código.
- Pode evoluir em drilldowns acionáveis.

## Blocos e superfícies que faltam
- Contrato unificado de tabs por domínio.
- Acesso rápido de insight -> operação.
- Performance para gráficos mais pesados.

## Estrutura de refatoração sugerida
- Quebrar a view em submódulos Overview/Operation/Commerce/Automation/AI.
- Remover comentários excessivos.
- Criar `AnalyticsDomainTabs` e `InsightToActionCard`.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

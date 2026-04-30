# NexxaLife — Diagnostic Domain Spec

Data: 2026-04-29
Status: documento canônico inicial do domínio crítico de diagnóstico
Objetivo: formalizar o ciclo diagnóstico como domínio próprio, separado da UI legada e da lógica simplificada atual.

---

## 1. Propósito

O domínio `diagnostic` transforma contexto pessoal e respostas estruturadas em um snapshot analítico reproduzível.

Ele deve:
- coletar contexto e respostas
- referenciar uma versão fixa do framework
- normalizar respostas
- produzir resultados rastreáveis
- servir de base para dashboard, metas e relatórios

Regra central:
- diagnóstico não é apenas um formulário
- diagnóstico é um ciclo versionado de coleta + cálculo + snapshot

---

## 2. O que o legado revela

O legado oferece uma boa narrativa inicial, porém uma implementação de cálculo ainda superficial.

Evidências observadas em `src/pages/Diagnostico.jsx`:
- separação simples em etapas (`Contexto pessoal`, `Eixos estratégicos`, `Resultados`)
- consumo direto de `nexxalife_framework`
- respostas guardadas em memória local por chave textual da pergunta
- cálculo de score médio por eixo e score geral simples
- persistência em `nexxalife_diagnosis_history`

Conclusão arquitetural:
- a narrativa de etapas é valiosa
- a modelagem de respostas e cálculo precisa ser reescrita

---

## 3. Problemas que precisam ser corrigidos

1. `answers[q.text]` usa texto visível como chave estrutural
2. cálculo mistura coleta e processamento no mesmo componente
3. ausência de `frameworkVersionId` explícito no registro final
4. ausência de normalização formal por tipo de pergunta
5. ausência de separação entre sessão, respostas e resultado final
6. `generalScore` do legado não está canonizado nem contextualizado
7. ausência de sinais derivados como risco, força, divergência e prioridade

---

## 4. Entidades canônicas do domínio

- `DiagnosticSession`
- `DiagnosticAnswer`
- `DiagnosticResultSnapshot`
- `FrameworkVersion` como dependência obrigatória

Extensões de fase seguinte:
- `CalculationRun`
- `RiskSignal`
- `StrengthSignal`
- `DiagnosticRecommendation`

---

## 5. Fluxo canônico do diagnóstico

### Etapa 1 — preparação
Entradas:
- `profileId`
- `frameworkVersionId`
- contexto inicial do usuário

Saída:
- `DiagnosticSession` em `draft` ou `in_progress`

### Etapa 2 — coleta estruturada
Entradas:
- perguntas da versão publicada
- respostas do usuário

Saída:
- `DiagnosticAnswer[]`

### Etapa 3 — normalização
Conversões esperadas:
- escala -> valor normalizado
- binário -> valor normalizado
- texto livre -> observação contextual, não score direto

### Etapa 4 — cálculo
Processa:
- scores por eixo
- scores por dimensão
- score geral (`overallScore`)
- sinais de força
- sinais de risco

### Etapa 5 — snapshot final
Saída:
- `DiagnosticResultSnapshot`
- referência explícita à `frameworkVersionId`
- versão do cálculo usada

### Etapa 6 — propagação controlada
Consumidores:
- dashboard
- metas
- relatórios
- futuras recomendações assistidas por IA

---

## 6. Casos de uso canônicos

### UC-DI-01 — iniciar sessão diagnóstica
Cria uma sessão com contexto inicial e vínculo com a versão ativa do framework.

### UC-DI-02 — salvar resposta
Registra ou atualiza uma `DiagnosticAnswer` por `questionId`.

### UC-DI-03 — retomar sessão
Reabre uma sessão `draft` ou `in_progress` sem perder consistência das respostas já fornecidas.

### UC-DI-04 — concluir coleta
Valida obrigatoriedade, integridade e prontidão para cálculo.

### UC-DI-05 — gerar snapshot
Executa cálculo e persiste `DiagnosticResultSnapshot`.

### UC-DI-06 — consultar resultado
Disponibiliza visão resumida e rastreável para outras superfícies.

---

## 7. Regras de domínio obrigatórias

1. toda sessão deve referenciar uma `FrameworkVersion`
2. toda resposta deve referenciar um `questionId`, nunca apenas texto visível
3. `DiagnosticAnswer.rawValue` e `normalizedValue` devem coexistir quando necessário
4. cálculo não deve depender diretamente da UI
5. resultado final deve ser snapshot imutável depois de concluído
6. `overallScore` é o nome canônico novo; `generalScore` fica restrito a mapeadores legados
7. contexto pessoal inicial pode enriquecer leitura, mas não deve contaminar silenciosamente a matemática sem regra explícita
8. uma sessão abandonada não deve sobrescrever uma sessão concluída

---

## 8. Contratos conceituais mínimos

### DiagnosticSession
Campos mínimos:
- `id`
- `profileId`
- `frameworkVersionId`
- `status`
- `startedAt`
- `completedAt?`
- `contextSnapshot`

### DiagnosticAnswer
Campos mínimos:
- `id`
- `sessionId`
- `questionId`
- `rawValue`
- `normalizedValue?`
- `notes?`
- `answeredAt`

### DiagnosticResultSnapshot
Campos mínimos:
- `id`
- `sessionId`
- `frameworkVersionId`
- `overallScore?`
- `axisScores[]`
- `dimensionScores[]`
- `riskSignals[]`
- `strengthSignals[]`
- `calculationVersion`
- `generatedAt`

---

## 9. Modelo de cálculo: decisão desta fase

Nesta macro-rodada, o modelo matemático completo ainda não é congelado.

Fica decidido apenas que:
- o cálculo será explicitamente versionado
- scores por eixo e dimensão devem ser preservados no snapshot
- `overallScore` pode existir, mas não deve ser a única leitura disponível
- sinais qualitativos (`riskSignals`, `strengthSignals`) são parte do valor do domínio

O que fica para a próxima fase:
- fórmula operacional definitiva
- pesos contextuais
- divergências e consistência longitudinal

---

## 10. Relação com metas e planejamento

O diagnóstico deve entregar insumos para planejamento, não criar metas automaticamente sem mediação.

Saídas úteis para o domínio de metas:
- eixos com maior fragilidade
- eixos com maior potencial de alavanca
- prioridades sugeridas
- recomendações iniciais

Princípio:
- diagnóstico informa planejamento
- planejamento decide transformação em meta

---

## 11. Tradução do legado para o modelo novo

### Legado
- `answers` indexado por texto da pergunta
- `generalScore`
- `axes` como objeto simplificado
- `nexxalife_diagnosis_history`

### Novo canônico
- `DiagnosticAnswer` por `questionId`
- `overallScore`
- `axisScores[]` tipado
- `DiagnosticResultSnapshot`

---

## 12. Anti-patterns proibidos

- usar texto da pergunta como identificador técnico
- recalcular tudo apenas no cliente como verdade final
- sobrescrever resultados diagnósticos antigos
- misturar contexto de onboarding, resposta diagnóstica e leitura final no mesmo objeto frouxo
- tratar score geral como único valor do diagnóstico

---

## 13. Requisitos de UI futura

A futura superfície de diagnóstico deve explicitar:
- etapa atual
- versão do framework utilizada
- progresso de resposta
- estados `draft / in_progress / completed`
- resumo final honesto
- conexão com relatórios e metas sem prometer automação mágica

---

## 14. Entregáveis técnicos esperados depois deste documento

1. contratos TypeScript de framework + diagnostic
2. interface de cálculo versionado
3. fixtures controladas para sessão e snapshot
4. backlog específico de engine diagnóstica
5. futura interface de repositório para salvar sessão, resposta e snapshot

---

## 15. Decisão desta macro-rodada

Fica canonizado que:
- `Diagnostico.jsx` do legado é referência narrativa, não implementação final
- o domínio diagnóstico precisa de sessão, resposta e snapshot separados
- `overallScore` substitui `generalScore` como naming canônico
- o motor de cálculo deve nascer versionado e desacoplado da UI

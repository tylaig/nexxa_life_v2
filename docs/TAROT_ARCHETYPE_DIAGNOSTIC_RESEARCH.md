# NexxaLife — Pesquisa para diagnóstico de avatar-arquétipo

## Objetivo

O avatar do perfil não deve ser apenas uma escolha estética. Ele deve poder nascer do relatório inicial, a partir de perguntas que identifiquem padrões de ação, decisão, energia e sombra do usuário.

Base conceitual usada como referência inicial: arquétipos junguianos aplicados aos Arcanos Maiores do tarot. A literatura popular mapeia os Arcanos Maiores como imagens simbólicas de padrões psicológicos universais: início, ação, intuição, criação, ordem, tradição, escolha, conquista, força, introspecção, ciclos, justiça, rendição, transformação, integração e esperança.

Não é leitura mística obrigatória: no produto, isso funciona como linguagem gamificada de identidade e motivação.

---

## Os 16 arquétipos usados na v1

1. O Louco — explorador, começo, risco, curiosidade.
2. O Mago — ação, ferramenta, execução, manifestação.
3. A Sacerdotisa — intuição, silêncio, percepção, profundidade.
4. A Imperatriz — criação, cuidado, abundância, fertilidade de ideias.
5. O Imperador — ordem, estrutura, comando, consistência.
6. O Hierofante — método, tradição, ensino, disciplina.
7. Os Enamorados — valores, escolha, conexão, alinhamento.
8. O Carro — direção, vitória, foco, avanço.
9. A Força — autocontrole, coragem, domínio interno.
10. O Eremita — estudo, solitude, estratégia profunda.
11. A Roda — adaptação, ciclos, timing, mudança.
12. A Justiça — ética, clareza, decisão, consequência.
13. O Enforcado — pausa, nova perspectiva, rendição inteligente.
14. A Morte — corte, transformação, renascimento.
15. A Temperança — equilíbrio, integração, ritmo, cura.
16. A Estrela — visão, esperança, inspiração, regeneração.

---

## Dimensões de pergunta

Cada pergunta deve medir uma tensão comportamental:

- ação rápida vs. planejamento;
- intuição vs. lógica;
- criação vs. estrutura;
- autonomia vs. conexão;
- controle vs. adaptação;
- intensidade vs. equilíbrio;
- introspecção vs. exposição;
- transformação vs. preservação.

---

## Banco inicial de perguntas

Responder em escala 1–5: discordo totalmente → concordo totalmente.

### O Louco

- Eu costumo começar antes de ter todas as respostas.
- O desconhecido me dá mais energia do que medo.
- Prefiro aprender tentando do que esperando o momento perfeito.

### O Mago

- Quando tenho clareza, consigo transformar ideia em ação rápido.
- Gosto de ferramentas, sistemas e atalhos que aumentam meu poder de execução.
- Sinto que meu desafio é canalizar energia para uma direção concreta.

### A Sacerdotisa

- Costumo perceber coisas antes de conseguir explicar racionalmente.
- Preciso de silêncio para tomar boas decisões.
- Minha força aumenta quando respeito minha intuição.

### A Imperatriz

- Gosto de criar, nutrir e fazer projetos crescerem com consistência.
- Ambientes bonitos, vivos ou acolhedores afetam muito minha energia.
- Tenho facilidade em cuidar de algo até amadurecer.

### O Imperador

- Me sinto melhor quando existe estrutura, regra clara e plano.
- Tenho tendência a assumir comando quando o ambiente está caótico.
- Meu progresso melhora quando transformo intenção em rotina.

### O Hierofante

- Aprendo bem com métodos, mentores, tradições ou sistemas testados.
- Gosto de transformar conhecimento em prática disciplinada.
- Sinto que posso ensinar melhor quando organizo o que aprendi.

### Os Enamorados

- Minhas decisões precisam estar alinhadas com meus valores.
- Relações e acordos influenciam muito minha evolução.
- Quando estou dividido internamente, minha execução cai.

### O Carro

- Quando defino um alvo, gosto de avançar com intensidade.
- Competição, prazo ou desafio aumentam minha energia.
- Preciso sentir movimento para confiar no processo.

### A Força

- Meu maior progresso vem quando domino meus impulsos sem me reprimir.
- Coragem calma é mais importante para mim do que explosão de energia.
- Tenho força para continuar mesmo quando a motivação oscila.

### O Eremita

- Preciso de tempo sozinho para organizar minha visão.
- Prefiro profundidade a excesso de estímulo.
- Meus melhores insights surgem quando reduzo o ruído externo.

### A Roda

- Consigo me adaptar bem quando planos mudam.
- Percebo ciclos, padrões e momentos certos para agir.
- Mudança me assusta menos quando entendo o ritmo dela.

### A Justiça

- Decisões justas e coerentes importam mais do que conveniência.
- Gosto de medir consequências antes de agir.
- Tenho necessidade de clareza, verdade e responsabilidade.

### O Enforcado

- Às vezes avanço mais quando paro e mudo a perspectiva.
- Tenho facilidade em sacrificar uma rota antiga por uma visão melhor.
- Nem toda pausa é procrastinação; algumas pausas me reorganizam.

### A Morte

- Sei quando uma fase precisa acabar para outra começar.
- Cortes difíceis podem me dar energia depois do desconforto inicial.
- Transformação radical faz parte da minha evolução.

### A Temperança

- Minha melhor versão surge quando combino disciplina e leveza.
- Busco equilíbrio entre corpo, mente, trabalho e relações.
- Consistência sustentável vale mais para mim do que intensidade curta.

### A Estrela

- Uma visão inspiradora me move mais do que obrigação.
- Recupero energia quando sinto esperança e propósito.
- Gosto de imaginar futuros melhores e trabalhar na direção deles.

---

## Algoritmo v1 sugerido

1. Cada pergunta soma pontos para seu arquétipo.
2. O diagnóstico inicial calcula o arquétipo dominante.
3. Empates são resolvidos por área com maior necessidade no relatório inicial:
   - produtividade baixa favorece Mago, Imperador, Carro;
   - saúde baixa favorece Temperança, Força, Imperatriz;
   - mente baixa favorece Sacerdotisa, Eremita, Enforcado;
   - propósito baixo favorece Estrela, Louco, Morte;
   - relações baixa favorece Enamorados, Justiça, Imperatriz;
   - finanças baixa favorece Imperador, Justiça, Hierofante.
4. O perfil recebe `archetype_key`, `archetype_name`, `archetype_title`, `identity_motto`.

---

## Próximo passo técnico

- Criar migration com tabela `archetype_questions` ou expandir `diagnostic_questions` com `archetype_key` e `archetype_weight`.
- Atualizar análise do diagnóstico para calcular arquétipo.
- Atualizar Perfil para mostrar “definido pelo relatório inicial” e permitir trocar manualmente depois.

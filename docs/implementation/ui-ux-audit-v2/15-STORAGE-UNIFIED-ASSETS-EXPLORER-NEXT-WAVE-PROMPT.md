# Storage Unificado + Assets Explorer — Prompt Refinado para Próxima Leva de Melhorias

## Contexto
Este documento define a próxima leva de evolução para o domínio de **Storage**, com foco em transformar a área atual em uma experiência unificada de **pastas + arquivos + visualização de assets acessíveis ao sistema e aos agentes**.

A intenção é sair de uma visão muito estática e resumida para uma experiência mais próxima de um **explorer operacional de assets**, com:

- visualização de pastas
- visualização de arquivos
- preview de tipos suportados
- organização dos assets acessíveis
- leitura mais útil para operação e agentes

Nesta fase, o foco deve estar nos assets realmente prioritários e viáveis.

Projeto:

- Repo: `/home/tylaig/repo/chat.meusuper.app`
- Rota Storage: `/storage`
- Arquivo da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/storage/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/storage/storage-overview-view.tsx`

---

# Prompt final

```md
Você é um especialista sênior em **product design, asset management UX, file explorer interfaces e refatoração frontend/backend em Next.js/React**.

Trabalhe no projeto:

`/home/tylaig/repo/chat.meusuper.app`

## Superfície alvo
- Rota: `/storage`
- Arquivo principal da rota: `/home/tylaig/repo/chat.meusuper.app/app/(app)/storage/page.tsx`
- View principal atual: `/home/tylaig/repo/chat.meusuper.app/components/storage/storage-overview-view.tsx`

## Objetivo geral
Transformar a área de **Storage** em uma experiência mais unificada e operacional, permitindo navegar por:

- pastas
- arquivos
- assets utilizáveis pelo sistema
- assets potencialmente acessíveis por agentes

A solução deve deixar de parecer apenas um inventário resumido e passar a parecer uma superfície mais útil de gestão e inspeção de assets.

Nesta fase, não é necessário abraçar tudo de uma vez. O foco inicial pode ficar nos tipos de asset mais importantes e viáveis.

---

## Escopo das melhorias

### 1. Unificar Storage em uma experiência de pastas + arquivos
A área de Storage precisa evoluir para uma experiência unificada.

Em vez de blocos separados e resumidos demais, a tela deve permitir uma navegação mais real entre:
- estrutura de pastas
- lista de arquivos
- preview do asset selecionado
- contexto básico do arquivo

A meta é aproximar a experiência de um explorer de assets, sem necessariamente virar um file manager completo nesta fase.

---

### 2. Permitir visualização de pastas
O usuário precisa conseguir visualizar melhor a estrutura de pastas.

Isso inclui:
- listagem de diretórios
- leitura clara do path
- noção de hierarquia
- seleção de pasta
- visualização dos conteúdos daquela pasta

A estrutura de pastas deve ajudar a entender melhor onde estão os materiais do workspace e quais estão acessíveis para determinadas partes do sistema.

---

### 3. Permitir visualização de arquivos
A área de Storage deve permitir inspecionar os arquivos relevantes armazenados.

Isso inclui:
- nome do arquivo
- tipo
- tamanho
- owner/origem
- pasta
- data relevante, quando aplicável
- permissões/escopo, quando aplicável

A UI precisa comunicar claramente os assets úteis, e não apenas mostrar uma lista seca.

---

### 4. Suportar preview de tipos relevantes de arquivo
Nesta fase, a solução deve priorizar preview para tipos de asset que façam mais sentido agora.

### Tipos prioritários desta fase
- arquivos Markdown (`.md`)
- arquivos de texto
- imagens
- possivelmente JSON ou outros assets textuais úteis ao sistema

### Sobre vídeo
Vídeo não precisa ser prioridade nesta fase atual.

Se existir arquitetura preparada para expansão futura, ótimo, mas o foco inicial não precisa cobrir playback/preview avançado de vídeo.

---

### 5. Permitir visualização adequada de arquivos Markdown
Arquivos Markdown devem ter uma visualização melhor resolvida.

Isso pode incluir:
- preview renderizado
- visualização do conteúdo em modo legível
- ou alternância entre fonte e preview

O importante é que `.md` não seja tratado apenas como blob de texto cru quando o objetivo for leitura operacional.

---

### 6. Permitir visualização adequada de arquivos de texto
Arquivos de texto também devem ter visualização simples e útil.

Essa visualização deve contemplar:
- leitura do conteúdo
- formatação mínima legível
- quebra de linha correta
- rolagem adequada
- sensação de inspeção real do arquivo

---

### 7. Permitir preview de imagens
Imagens precisam ter preview visual dentro da experiência de Storage.

Isso deve contemplar:
- thumbnail ou preview principal
- noção de dimensões, quando aplicável
- metadados úteis básicos, se fizer sentido
- experiência de inspeção limpa e moderna

---

### 8. Mostrar os assets que o agente pode acessar
Storage também deve contemplar a leitura dos assets que podem ser acessados por agentes, mas com critério.

A ideia não é mostrar tudo indiscriminadamente, mas sim os assets relevantes e possíveis dentro da arquitetura do sistema.

A experiência deve ajudar a entender:
- quais assets pertencem ao workspace
- quais podem ser usados por agentes
- quais têm restrição por escopo
- quais estão ligados a knowledge, campanhas, integrações ou outros domínios

---

### 9. Trabalhar com o conceito de “assets possíveis/permitidos”
Você comentou que quer mostrar apenas os assets que sejam possíveis de acessar. Isso é importante.

A implementação deve considerar que Storage não precisa ser um dump completo de qualquer arquivo do sistema.

Ela deve priorizar:
- assets permitidos
- assets relevantes ao produto
- assets do workspace
- assets que façam sentido operacionalmente
- assets conectados a agentes, knowledge, campanhas ou integrações

---

### 10. Melhorar a navegação e a usabilidade do Storage
A navegação da tela deve evoluir para permitir:
- selecionar pasta
- ver conteúdo da pasta
- selecionar arquivo
- ver preview do arquivo
- entender escopo e origem do asset

A experiência final deve parecer muito mais útil do que o overview estático atual.

---

## Estrutura recomendada da experiência
A solução pode se aproximar de algo como:

- painel de pastas
- lista/grid de arquivos
- painel de preview ou detalhe do asset

Ou, se preferir uma experiência mais linear nesta fase:
- navegação por pasta
- lista de arquivos
- preview abaixo ou em drawer/painel lateral

O importante é evitar uma UI excessivamente fragmentada ou decorativa.

---

## Estrutura conceitual recomendada
A proposta deve considerar conceitos como:

- **Folder Tree**
- **Asset List**
- **Asset Preview**
- **Asset Scope**
- **Agent Accessible Assets**
- **Workspace Assets**
- **Knowledge Assets**
- **Campaign Assets**
- **Integration Assets**

---

## Sugestões de superfícies/rotas
A solução pode considerar:

- `/storage`
- `/storage/folders/[path]`
- `/storage/assets/[id]`

Ou outra estrutura coerente, desde que a navegação entre pastas, arquivos e preview fique clara.

---

## Diretrizes de UX
Priorizar:
- experiência unificada de explorer
- clareza entre pasta e arquivo
- preview útil para tipos prioritários
- leitura melhor de Markdown e texto
- preview limpo de imagens
- noção clara de assets acessíveis aos agentes
- aparência moderna e operacional

Evitar:
- tela estática demais
- assets sem contexto de origem/escopo
- preview inexistente para tipos importantes
- tentar abraçar todos os formatos avançados cedo demais
- excesso de complexidade desnecessária nesta fase

---

## Diretrizes técnicas
Ao implementar, seguir estas regras:

- tratar Storage como domínio de assets do workspace
- priorizar tipos de asset com maior valor imediato
- criar preview por tipo de arquivo de forma modular
- preparar a arquitetura para expansão futura
- não depender de suporte completo a vídeo nesta fase
- considerar acessos por escopo/workspace/agente
- manter coerência com o design system atual

---

## O que entregar

### 1. Diagnóstico atual
Analisar:
- limitações da tela atual de Storage
- ausência de navegação real por pastas e arquivos
- ausência ou limitação de previews
- gaps para assets acessíveis por agentes

### 2. Proposta funcional
Organizar a solução em blocos:
- unificação do storage
- pastas
- arquivos
- preview
- assets acessíveis
- escopo/owner/origem

### 3. Proposta de arquitetura de informação
Definir:
- como navegar entre pastas
- como visualizar arquivos
- como abrir preview
- como mostrar origem e acessibilidade do asset

### 4. Refatoração/implementação frontend/backend
Sugerir e/ou implementar mudanças reais em:
- tela de storage
- navegação por pasta
- preview de markdown/texto/imagem
- modelagem de assets acessíveis
- estados de visualização

### 5. Resumo final
Ao final, apresentar:
- o que foi proposto/implementado
- quais arquivos foram alterados
- como Storage ficou mais unificado
- como a solução foi limitada de forma inteligente nesta fase

---

## Critérios de aceite
A melhoria só deve ser considerada pronta se:

- Storage parecer uma experiência unificada de pastas + arquivos
- for possível visualizar melhor a estrutura de pastas
- for possível visualizar arquivos relevantes
- houver preview útil para Markdown, texto e imagens
- a tela comunicar os assets que agentes podem acessar, quando aplicável
- a solução evitar escopo excessivo desnecessário como vídeo avançado nesta fase
- a experiência geral parecer mais moderna e mais útil operacionalmente

---

## Regras finais
- responda em português
- organize em Markdown
- pense como produto real em produção
- não entregue só melhorias cosméticas
- trate Storage como domínio de assets do produto
- preserve coerência com o app existente
- implemente com visão escalável
```

---

# Resumo desta versão

Esta versão melhora a ideia original porque:

- transforma Storage em explorer unificado de assets
- separa claramente pastas, arquivos e preview
- prioriza preview útil para Markdown, texto e imagem
- incorpora o conceito de assets acessíveis por agentes
- limita o escopo de forma inteligente, evitando vídeo avançado agora

---

# Nome recomendado para uso interno

Sugestões:

- `Storage Unified Assets Explorer`
- `Storage Next Wave`
- `Assets Explorer and Preview Prompt`

# Contacts

## Arquivos analisados
- `app/(app)/contacts/page.tsx`
- `components/contacts/contacts-view.tsx`

## Objetivo operacional
- Operar CRM unificado de contatos, segmentos e sinais de relacionamento.
- Usuário: CRM, marketing, atendimento e growth.
- Ação primária: localizar, segmentar e agir sobre contatos.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 3/5
- Consistência: 3/5
- Estados operacionais: 2/5
- Responsividade: 3/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A tela de contatos é limpa e funcional, porém ainda parece mais uma tabela administrativa do que um CRM vivo. A lateral de segmentos ajuda, mas ainda é pouco acionável. Falta quick actions, inspeção lateral de contato e sinais mais fortes de lifecycle, última interação, opt-in e oportunidades.

## Problemas encontrados
- Tela excessivamente orientada à tabela.
- Segmentos laterais com utilidade limitada.
- Pouca sensação de CRM operacional vivo.
- Falta quick actions por linha.
- Falta inspector/drawer sem sair da listagem.
- Filtros avançados ainda superficiais.
- Empty states e paginação simples demais.

## Melhorias recomendadas
### Quick wins
- Adicionar coluna/metadata de última interação e consentimento.
- Reforçar leitura de VIP, risco e lifecycle.
- Incluir quick actions inline.
- Melhorar empty state por segmento.

### Estruturais
- Criar drawer lateral de perfil resumido.
- Evoluir tabela para `EntityTable` com ordenação e filtros reais.
- Tornar segmentos combináveis.
- Aproximar tela de campanhas, automações e atendimento.

### Novas superfícies
- `/contacts/[id]`
- `/contacts/segments`
- `/contacts/import`

## Refatoração sugerida
- Extrair `ContactsSegmentsRail`, `ContactRowActions`, `ContactLifecycleBadge`, `ContactInspectorPanel`.
- Separar filtros/segmentação em hook.
- Unificar table patterns com outras páginas de catálogo.

## Plano de implementação
1. Melhorar sinais na listagem.
2. Incluir quick actions.
3. Criar inspector lateral.
4. Evoluir filtros e segmentos.
5. Revisar estados e paginação.

## Critérios de aceite
- Contatos relevantes são identificáveis sem abrir detalhe.
- Segmentos deixam de ser apenas navegação e passam a ser operacionais.
- Ações de campanha/atendimento ficam mais próximas da tabela.

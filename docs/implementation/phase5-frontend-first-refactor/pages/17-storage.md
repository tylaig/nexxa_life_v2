# Storage

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Storage`.

## Rotas atuais
- /storage

## Rotas alvo
- /storage
- /storage/folders/[folderId]
- /storage/files/[fileId] or drawer

## O que já está forte
- Boa base conceitual para explorer.
- Tema importante para assets e conhecimento.

## Gaps validados nesta rodada
- Navegação de pasta e preview ainda fracos.
- Permissões e ações por item não estão visíveis.
- Drilldown não está explícito.

## Blocos e superfícies que faltam
- Breadcrumb interno.
- Preview de arquivo.
- ACLs e versionamento.
- Ações por item e integração com knowledge.

## Estrutura de refatoração sugerida
- Criar `StorageExplorer`, `FilePreviewDrawer`, `StoragePermissionsPanel`.
- Preparar contractos para upload, preview e vínculo com outros módulos.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

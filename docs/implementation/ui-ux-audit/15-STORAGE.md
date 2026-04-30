# Storage

## Arquivos analisados
- `app/(app)/storage/page.tsx`
- `components/storage/storage-overview-view.tsx`

## Objetivo operacional
- Operar assets, pastas, permissões e materiais do workspace.
- Usuário: AI ops, marketing ops, operações técnicas e governança.
- Ação primária: localizar, inspecionar e entender ownership/permissões dos assets.

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
A tela ainda parece inventário estático. Ela comunica o domínio, mas ainda não funciona como storage explorer operacional. Faltam navegação de pastas, filtros, criticidade, ownership forte e conexão com superfícies consumidoras como knowledge, campaigns e agents.

## Problemas encontrados
- Estrutura de pastas muito passiva.
- Assets recentes sem ação prática.
- Falta destaque para owners, permissões e criticidade.
- CTA de upload é fraco e mockado.
- Não há detalhe de asset ou pasta.
- Filtros e estados operacionais praticamente ausentes.

## Melhorias recomendadas
### Quick wins
- Destacar assets recentes, grandes, críticos ou órfãos.
- Melhorar leitura de owner e access.
- Reforçar conexão com knowledge/campaigns/agents.

### Estruturais
- Evoluir para storage explorer com navegação por pastas.
- Criar detalhe de asset/pasta.
- Adicionar filtros por owner, tipo, acesso e uso.
- Incluir ações operacionais de upload, mover, copiar vínculo e revisar permissão.

### Novas superfícies
- `/storage/explorer`
- `/storage/assets/[id]`
- `/storage/folders/[path]`

## Refatoração sugerida
- Extrair `StorageFolderList`, `StorageAssetList`, `AssetOwnerBadge`, `AssetInspectorPanel`.
- Criar modelos distintos para pasta e asset.
- Preparar primitives reutilizáveis para superfícies de assets.

## Plano de implementação
1. Melhorar leitura de owner/permissão.
2. Inserir sinais operacionais reais.
3. Criar navegação mais forte de pastas/assets.
4. Preparar detalhe e ações.
5. Revisar estados e integração com outros módulos.

## Critérios de aceite
- A tela deixa de parecer inventário estático.
- Ownership, acesso e relevância do asset ficam claros.
- O usuário consegue agir sobre assets e navegar melhor.

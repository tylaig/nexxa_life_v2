# Skills

## Arquivos analisados
- `app/(app)/skills/page.tsx`
- `components/skills/skills-view.tsx`

## Objetivo operacional
- Criar e gerenciar skills de IA com variáveis, preview e catálogo.
- Usuário: AI ops, produto, operações técnicas e builders internos.
- Ação primária: criar skill e validar prompt final antes de publicar.

## Scorecard
- Clareza operacional: 3/5
- Hierarquia visual: 3/5
- Escaneabilidade: 2/5
- Consistência: 3/5
- Estados operacionais: 3/5
- Responsividade: 2/5
- Acessibilidade: 3/5
- Escalabilidade frontend: 3/5

## Resumo executivo
A página já funciona como produto real, com criação e listagem vindas de API. O problema é que a experiência ainda é muito “formulário técnico”. Falta separar melhor editor, preview, catálogo e valor operacional da skill.

## Problemas encontrados
- Forte caráter de formulário.
- Preview do prompt final pouco valorizado visualmente.
- Variáveis detectadas com pouco destaque.
- Listagem de skills ainda simples.
- Falta clareza de uso, bindings e output mode.
- Escalabilidade ruim para edição mais complexa.

## Melhorias recomendadas
### Quick wins
- Destacar variáveis detectadas e preview final.
- Melhorar feedback de criação/erro/loading.
- Enriquecer lista de skills com status, categoria e output.

### Estruturais
- Separar editor, preview e catálogo em zonas claras.
- Preparar editor full-screen.
- Criar exemplos/snippets iniciais.
- Explicar melhor onde e como a skill é usada.

### Novas superfícies
- `/skills/[id]`
- `/skills/[id]/versions`
- `/skills/templates`

## Refatoração sugerida
- Extrair `SkillEditorPanel`, `SkillPreviewPanel`, `SkillVariablesPanel`, `SkillCatalogList`.
- Mover parsing/render para hook ou helper de apresentação.
- Criar estado local mais modular para o editor.

## Plano de implementação
1. Melhorar hierarquia editor/preview.
2. Enriquecer visual de variáveis e prompt final.
3. Evoluir listagem existente.
4. Preparar full-screen editor.
5. Revisar responsividade.

## Critérios de aceite
- Criar uma skill parece operação de produto, não só formulário.
- Variáveis e preview final ficam muito mais claros.
- A tela escala melhor para skills mais complexas.

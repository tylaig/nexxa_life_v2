# Skills

## Objetivo operacional
- Conduzir uma superfície profissional, previsível e escalável para o domínio `Skills`.

## Rotas atuais
- /skills
- /ai-studio/skills (parcial/redirecionado)

## Rotas alvo
- /ai-studio/skills

## O que já está forte
- Modal de criação com preview já oferece uma base boa.
- Conceito se encaixa naturalmente em AI Studio.

## Gaps validados nesta rodada
- Rota e contexto fragmentados.
- Empty state ainda abstrato.
- Pouca profundidade de catálogo, categorias e publicação.

## Blocos e superfícies que faltam
- Templates iniciais.
- Categorias.
- Publicação/versionamento.
- Integração plena ao shell AI Studio.

## Estrutura de refatoração sugerida
- Migrar visual e semanticamente para AI Studio.
- Criar `SkillTemplateGallery`, `SkillPublishState`, `SkillInspector`.
- Remover legado `/skills` no fim da migração.

## Checklist de execução
- [ ] classificar todos os CTAs da página como real/mock/blocked
- [ ] validar loading/empty/error/degraded
- [ ] revisar idioma e nomenclatura
- [ ] aplicar primitives transversais
- [ ] registrar print antes
- [ ] registrar print depois
- [ ] atualizar progresso e QA da página

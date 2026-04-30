# Fase 4.1 — Document Chunks

## Objetivo

Evoluir o módulo de Knowledge de `documents` para `documents -> chunks`, materializando fragmentos textuais persistidos por documento e expondo-os na UI.

## Escopo desta rodada

1. adicionar contracts e store para `knowledge chunks`
2. expandir repository com geração/listagem de chunks por document
3. criar endpoint dedicado para listar chunks de um documento
4. fazer a criação de document já materializar chunks automaticamente
5. expandir a UI para selecionar um documento e visualizar seus chunks
6. validar com testes e build

## Critérios de sucesso

- todo document novo gera chunks automaticamente
- chunks podem ser listados por document via API
- a UI mostra chunks do documento selecionado
- progresso salvo em docs/implementation

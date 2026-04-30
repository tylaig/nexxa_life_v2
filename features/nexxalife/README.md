# features/nexxalife

Camada de orquestração por domínio.

Sugestão:
- cada feature compõe UI + estado controlado + casos de uso
- não embutir persistência final diretamente nos componentes
- toda feature deve apontar para contratos em `lib/nexxalife/contracts/*`

# Deploy com Docker + Portainer + Traefik

## Objetivo

Padronizar o deploy da aplicação `chat.meusuper.app` em ambiente escalável usando:
- imagem Docker multi-stage
- Portainer para gestão de stack
- Traefik como reverse proxy e TLS terminator
- Docker Swarm para replicação e rolling update

---

## 1. Estado atual

O projeto agora possui:
- `Dockerfile` multi-stage com build Next.js standalone
- `.dockerignore`
- endpoint de healthcheck em `/api/health`
- stack Swarm pronta em `stack.portainer.traefik.yml`
- `.env.example` para variáveis base da aplicação
- `.env.portainer.example` para variáveis da stack

---

## 2. Decisão recomendada de runtime

### Recomendação

Usar `Docker Swarm + Portainer + Traefik`.

### Motivos

1. Portainer lida muito bem com stacks Swarm.
2. Escalabilidade horizontal por `replicas` fica simples.
3. Rolling update e rollback ficam nativos.
4. Traefik integra diretamente por labels Docker.
5. É o melhor meio-termo entre simplicidade operacional e escalabilidade para esta fase.

---

## 3. Pré-requisitos do cluster

### No cluster/host

- Docker instalado
- Swarm iniciado (`docker swarm init` no manager)
- Portainer já operacional
- Traefik já operacional como stack ou service
- rede externa compartilhada chamada `traefik-public`

Criar rede se necessário:

```bash
docker network create --driver overlay --attachable traefik-public
```

---

## 4. Build e publicação da imagem

### Build local

```bash
docker build -t ghcr.io/meusuper/chat.meusuper.app:latest .
```

### Exemplo com tag versionada

```bash
docker build -t ghcr.io/meusuper/chat.meusuper.app:2026-04-28-01 .
```

### Push

```bash
docker push ghcr.io/meusuper/chat.meusuper.app:2026-04-28-01
```

---

## 5. Variáveis mínimas para a stack

Definir no Portainer ou em env file:

- `APP_IMAGE=ghcr.io/meusuper/chat.meusuper.app`
- `APP_TAG=latest`
- `APP_REPLICAS=2`
- `APP_BASE_URL=https://chat.exemplo.com`
- `TRAEFIK_HOST=chat.exemplo.com`
- `TRAEFIK_ENTRYPOINTS=websecure`
- `TRAEFIK_CERTRESOLVER=letsencrypt`

---

## 6. Deploy no Portainer

### Opção recomendada

Criar uma stack usando o arquivo:
- `stack.portainer.traefik.yml`

### Passos

1. Portainer > Stacks
2. Add stack
3. Nome: `chat-meusuper-app`
4. Colar conteúdo de `stack.portainer.traefik.yml` ou apontar repositório Git
5. Informar environment variables
6. Deploy the stack

---

## 7. Como a stack está desenhada

### Serviço

- serviço único `chat-meusuper-app`
- imagem externa versionável
- `replicas` configuráveis
- update strategy `start-first`
- rollback automático se update falhar
- restart policy de produção

### Traefik

A stack já configura:
- router por `Host()`
- porta interna 3000
- TLS ativo
- certresolver configurável
- middleware de compressão
- headers básicos de segurança

### Healthcheck

A stack e a imagem usam:
- `GET /api/health`

Payload esperado:
- `ok: true`
- `status: healthy`

---

## 8. Estratégia de escala

### Horizontal scaling

Aumentar:
- `APP_REPLICAS=2` -> `3` -> `4`

### Quando escalar

Escalar quando houver:
- aumento de volume de conversas
- mais sessões simultâneas de operadores
- mais webhooks de entrada
- automações e sincronizações concorrentes

### Observação

Como a aplicação ainda está sem banco/filas reais, escalar réplica hoje melhora disponibilidade do frontend/BFF, mas a escalabilidade plena depende de:
- banco compartilhado
- persistência real
- event ingestion durável
- filas/workers separados

---

## 9. Próximos ajustes recomendados para produção real

### Infra imediata

1. adicionar banco relacional gerenciado ou stack separada
2. mover credenciais para secrets do Swarm/Portainer
3. introduzir logs estruturados
4. adicionar observabilidade
5. adicionar worker service para webhooks/automações futuras

### Aplicação

1. substituir store in-memory por banco
2. persistir conversations/messages/orders
3. integrar Meta Cloud API
4. integrar Shopify
5. criar event log/outbox

---

## 10. Comandos úteis de operação

### Ver serviços

```bash
docker service ls
```

### Ver tasks do serviço

```bash
docker service ps chat-meusuper-app_chat-meusuper-app
```

### Ver logs

```bash
docker service logs -f chat-meusuper-app_chat-meusuper-app
```

### Atualizar imagem

```bash
docker service update --image ghcr.io/meusuper/chat.meusuper.app:NEW_TAG chat-meusuper-app_chat-meusuper-app
```

---

## 11. Recomendação final

A aplicação agora está pronta para ser empacotada como imagem Docker e publicada via Portainer/Traefik de forma escalável.

O próximo passo técnico mais importante não é sofisticar ainda mais a stack de deploy.
É conectar essa imagem a uma base persistente e a integrações reais, para que as réplicas escalem uma aplicação já stateful do jeito certo.

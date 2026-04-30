# v0-plataforma-de-e-commerce

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_phVSQuuo3dTA295iwHGEMQjUuITC)

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Run the application:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local pgvector / Supabase-ready RAG setup

This project now includes a local pgvector foundation for the Knowledge/RAG module.

Start the local vector database with Docker:

```bash
docker compose up -d
```

Apply the SQL migrations to the local database:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:54322/chat_meusuper pnpm run db:migrate
```

Key files for this setup:

- `.env.example`
- `docker-compose.yml`
- `db/migrations/003_supabase_vector_store.sql`
- `supabase/schema.sql`
- `lib/server/supabase.ts`

Relevant environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SCHEMA`
- `AI_GATEWAY_BASE_URL`
- `AI_GATEWAY_API_KEY`
- `AI_GATEWAY_EMBEDDING_MODEL`
- `RAG_USE_PGVECTOR`
- `RAG_MATCH_THRESHOLD`
- `DATABASE_URL`

What Phase 4.3 adds on top of the vector foundation:

- real embeddings generation through an OpenAI-compatible `/embeddings` gateway
- SQL persistence for `knowledge_embeddings`, `knowledge_chunk_embeddings`, and `retrieval_logs`
- retrieval ranked by chunk and remounted back into document-level context

## Verification

Recommended verification commands:

```bash
pnpm test
pnpm build
DATABASE_URL=postgres://postgres:postgres@localhost:54322/chat_meusuper pnpm run db:migrate
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/samu-dubotics/v0-plataforma-de-e-commerce" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

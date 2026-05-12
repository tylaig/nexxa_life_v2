-- Agent Memory System
-- Persistent per-user memory files (soul.md, memory.md, skills.md)
-- Survives chat resets

CREATE TABLE IF NOT EXISTS agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL CHECK (memory_type IN ('soul', 'memory', 'skills')),
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One file per user per type
CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_memory_user_type
  ON agent_memory(user_id, memory_type);

-- Full text search index
CREATE INDEX IF NOT EXISTS idx_agent_memory_content_search
  ON agent_memory USING gin(to_tsvector('portuguese', content));

-- RLS
ALTER TABLE agent_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own memory"
  ON agent_memory FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

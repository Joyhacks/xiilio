

## Upgrade Agent AI with Patterns from Xiilio AI Lead Agency

The other project has several production-ready patterns that this project is missing. Here's what to bring over and integrate:

### 1. Add Conversation Persistence (chat_conversations table)

Create a `chat_conversations` table to store all agent chat messages with session tracking. This enables the RAG (Retrieval-Augmented Generation) system from the other project.

**Database migration:**
- `chat_conversations` table with columns: `id`, `session_id`, `agent_slug`, `role`, `content`, `user_id` (nullable), `created_at`
- RLS policies for read/insert
- Index on `session_id` and `content` for RAG queries

### 2. Add RAG Context Retrieval to All Agent Edge Functions

Port the semantic keyword search RAG system from the other project's `chat/index.ts` into the shared `_shared/agentMemory.ts`:
- Extract keywords from user messages (with stopword filtering)
- Search past conversations for relevant Q&A pairs
- Score by keyword relevance and inject top matches into system prompt
- This makes agents smarter over time — they recall past interactions across sessions

### 3. Add Input Validation & Rate Limiting

Port the production-hardened patterns:
- **Input validation**: Message length limits (2000 chars), max messages (50), sanitization of control characters
- **Rate limiting**: In-memory per-session rate limiter (15 req/min) with automatic cleanup
- Add to `_shared/agentMemory.ts` as shared utilities used by all 8 agent functions

### 4. Update All 8 Agent Edge Functions

Update each agent function (`nicole-chat`, `halle-chat`, `george-chat`, `arnie-chat`, `brad-chat`, `sam-chat`, `jerry-chat`, `receptionist-chat`) to:
- Use input validation before processing
- Check rate limits
- Generate a session ID from the frontend
- Store user + assistant messages to `chat_conversations`
- Retrieve RAG context and inject into system prompt
- Intercept the stream to capture assistant response for storage
- Handle 429/402 errors properly

### 5. Update Frontend to Send Session IDs

Update `src/components/AgentChat.tsx` to:
- Generate a unique session ID per conversation
- Send `sessionId` alongside `messages` in the request body
- Send `agentSlug` for proper conversation tagging

### 6. Update Company Context

Update `_shared/agentMemory.ts` `COMPANY_CONTEXT` to use the updated Xiilio branding and comprehensive company description from the other project (services, results, security info).

### Files to create/modify

| File | Action |
|------|--------|
| `chat_conversations` table | Create via migration |
| `supabase/functions/_shared/agentMemory.ts` | Add RAG retrieval, input validation, rate limiting, update company context |
| `supabase/functions/nicole-chat/index.ts` | Add validation, RAG, conversation persistence |
| `supabase/functions/halle-chat/index.ts` | Same pattern |
| `supabase/functions/george-chat/index.ts` | Same pattern |
| `supabase/functions/arnie-chat/index.ts` | Same pattern |
| `supabase/functions/brad-chat/index.ts` | Same pattern |
| `supabase/functions/sam-chat/index.ts` | Same pattern |
| `supabase/functions/jerry-chat/index.ts` | Same pattern |
| `supabase/functions/receptionist-chat/index.ts` | Same pattern |
| `src/components/AgentChat.tsx` | Add session ID generation, send with requests |


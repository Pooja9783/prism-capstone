# Prism – AI Gateway & Semantic Cache

Prism is a production-style AI Gateway that provides a single OpenAI-compatible API for routing requests across multiple LLM providers. It includes smart routing, semantic caching, retry & failover, rate limiting, budget enforcement, usage metering, and a simple operations dashboard.

---

# Features

## Unified Chat API

- OpenAI-compatible `POST /v1/chat/completions`
- Single endpoint for multiple providers
- Provider abstraction using adapters

---

## Smart Routing

Supports three model aliases:

- `fast`
- `smart`
- `auto`

The `auto` alias classifies prompts and routes them to either the fast or smart model based on prompt complexity.

---

## Retry & Failover

- Exponential backoff retry
- Automatic provider failover
- Fallback tracking
- Provider timeout handling

---

## Semantic Cache

- Embedding-based similarity search
- Cache scoped per tenant
- Prevents duplicate LLM calls
- Cache hit tracking

---

## Virtual API Keys

Supports tenant-based authentication.

Each tenant has:

- Virtual API Key
- Model allowlist
- Monthly budget
- Requests per minute limit

---

## Usage Metering

Tracks:

- Prompt tokens
- Completion tokens
- Total tokens
- Request cost
- Provider used
- Cache hits
- Failovers
- Latency

---

## Operations Dashboard

Frontend includes:

- Dashboard
- Requests page
- Usage analytics
- Gateway Settings

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Shadcn UI

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI

- OpenRouter
- Embedding-based Semantic Cache

---

# Project Structure

```
backend/
 ├── controllers
 ├── middlewares
 ├── providers
 ├── routes
 ├── services
 ├── models
 ├── tests
 ├── utils
 └── config

frontend/
 ├── app
 ├── components
 ├── lib
 └── types
```

---

# API Endpoints

## Chat

```
POST /v1/chat/completions
```

---

## Metrics

```
GET /v1/metrics
GET /v1/metrics/usage
GET /v1/metrics/usage-details
GET /v1/metrics/providers
GET /v1/metrics/models
```

---

## Requests

```
GET /v1/requests
```

---

## Settings

```
GET /v1/settings
```

---

# Request Flow

```
Client
   │
   ▼
Authentication
   │
   ▼
Model Allowlist
   │
   ▼
Rate Limit Check
   │
   ▼
Budget Check
   │
   ▼
Smart Routing
   │
   ▼
Semantic Cache
   │
   ▼
Provider
   │
   ▼
Retry
   │
   ▼
Fallback
   │
   ▼
Usage Metering
   │
   ▼
MongoDB Logs
```

---

# Smart Routing

| Alias | Primary | Fallback |
|--------|----------|-----------|
| fast | alpha-small | beta-small |
| smart | alpha-large | beta-large |
| auto | Prompt Classification | Dynamic |

---

# Retry Strategy

- Exponential Backoff
- Configurable Attempts
- Automatic Failover

---

# Semantic Cache

Responses are cached using embedding similarity.

If similarity ≥ 0.92

```
Return cached response
```

Otherwise

```
Call Provider
Save Response
```

---

# Usage Tracking

Each request stores:

- Team
- Provider
- Model
- Prompt Tokens
- Completion Tokens
- Total Tokens
- Cost
- Cache Hit
- Fallback
- Latency

---

# Dashboard

Shows:

- Total Requests
- Total Cost
- Total Tokens
- Average Latency
- Cache Hit Rate
- Fallback Count

---

# Usage Page

Displays:

- Daily Cost
- Token Usage
- Provider Distribution
- Top Model Usage

---

# Request Logs

Displays

- Provider
- Model
- Status
- Cost
- Latency
- Cache
- Fallback
- Timestamp

---

# Settings

Read-only gateway configuration showing:

- Providers
- Model Routing
- Retry Configuration
- Provider Degradation Settings

---

# Automated Tests

Implemented unit tests for:

- Cost Computation
- Routing Behavior
- Rate Limiting
- Semantic Cache
- API Key Authentication & Model Allowlists

Run tests:

```
npm test
```

---

# Environment Variables

Backend

```
PORT=

MONGO_URI=

OPENROUTER_API_KEY=
```


---

# Running Locally

Backend

```
npm install
npm run dev
```

Frontend

```
npm install
npm run dev
```

---

# Future Improvements

- Redis Rate Limiting
- Streaming Usage Analytics
- Admin Authentication
- Live Provider Health Monitoring
- Editable Gateway Configuration
- Docker Deployment
- Kubernetes Support

---

# Author
Pooja Sankhala


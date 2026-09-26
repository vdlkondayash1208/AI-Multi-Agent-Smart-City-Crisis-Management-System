# Disaster Management Backend Infrastructure

This backend connects the React Frontend (`shiva` branch) with the AI Multi-Agent Core (`ram-shankar` branch).

## Architecture
- **Framework**: FastAPI
- **Database**: PostgreSQL with PostGIS extensions
- **ORM**: SQLAlchemy
- **Message Broker**: RabbitMQ
- **Caching**: Redis
- **CI/CD**: GitHub Actions

## Setup Instructions
1. Copy `.env.example` to `.env` and fill the variables.
2. Spin up the infrastructure using Docker Compose from the root directory:
   ```bash
   docker-compose up --build -d
   ```
3. Run migrations (Requires Alembic initialized in production):
   ```bash
   alembic upgrade head
   ```

## Development
Run the backend locally:
```bash
uvicorn app.main:app --reload --port 5000
```
Run tests:
```bash
pytest tests/
```

## AI Integration (`app/api/ai.py`)
Provides seamless HTTP communication with the AI microservice running on port 8000. It logs all agent responses and human approval decisions securely into PostgreSQL.

## Messaging (`app/services/messaging.py`)
Utilizes `pika` to broadcast events (`incident.created`) over the `disaster_events` RabbitMQ exchange for decoupled processing.

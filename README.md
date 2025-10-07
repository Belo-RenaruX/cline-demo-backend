# Cline Demo Backend

A Fastify backend server to demonstrate Cline, now using SQLite for database storage.

## Prerequisites

### Required Dependencies

1. **Node.js v22.0.0 or higher**
   - Download: https://nodejs.org/en/download/
   - Or use Node Version Manager (NVM):
     - macOS/Linux: https://github.com/nvm-sh/nvm
     - Windows: https://github.com/coreybutler/nvm-windows

2. **SQLite3** (optional - only if you need direct database access)
   - macOS: Pre-installed or `brew install sqlite3`
   - Ubuntu/Debian: `sudo apt-get install sqlite3`
   - Windows: https://www.sqlite.org/download.html

### Verification Commands

After installation, you can verify:
- `node --version` (should show v22.0.0 or higher)
- `sqlite3 --version` (optional)

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:Belo-RenaruX/cline-demo-backend.git
   cd cline-demo-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   NODE_ENV=development
   NODE_PORT=3000
   LOG_LEVEL=DEBUG
   DB_PATH=./database.sqlite
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```
   This will create the SQLite database file and set up the required tables.

5. Start the development server:
   ```bash
   npm run dev
   ```
   The server will be available at http://localhost:3000.

## API Endpoints

- `POST /v1/users/login` - Login endpoint
  - Request body: `{ "username": "renarux", "password": "test123" }`
  - Response: User information with authentication status

## Project Structure

- `src/clients/` - Database and logger clients
- `src/controllers/` - HTTP controllers and routers
- `src/entities/` - Domain entities, DTOs, and models
- `src/entrypoints/` - Application entry points
- `src/helpers/` - Helper utilities
- `src/managers/` - Managers for OpenAPI and responses
- `src/migrations/` - Database migrations
- `src/repositories/` - Data access layer
- `src/statics/` - Static configuration
- `src/templates/` - Templates for views
- `src/useCases/` - Business logic

## Database

This project uses SQLite for data storage. The database file is automatically created when running migrations and is stored at the path specified in the `DB_PATH` environment variable.

### Important Notes

- The SQLite database file (`database.sqlite`) is excluded from version control.
- Each developer should run migrations to create their own local database.
- The database schema is defined in the migration files.

# Technical Context: Cline Demo Backend

## Technology Stack

### Core Technologies
- **TypeScript**: Strongly-typed programming language built on JavaScript
  - Using strict mode for maximum type safety
  - Version: 5.9.3
- **Node.js**: JavaScript runtime
  - Version requirement: >=22.0.0 <23.0.0

### Web Framework
- **Fastify**: High-performance web framework
  - Version: 5.6.1
  - Used for routing, request handling, and API documentation
  - Plugins: @fastify/cors for CORS support

### Database
- **SQLite**: Lightweight, file-based relational database
  - Accessed via better-sqlite3 (v12.4.1)
  - Database file stored at path specified in DB_PATH environment variable

### Query Builder
- **Kysely**: Type-safe SQL query builder
  - Version: 0.28.7
  - Used for database interactions with full TypeScript support
  - Handles migrations through its built-in migration system

### Validation
- **Zod**: Schema validation library
  - Version: 4.1.11
  - Used for input/output validation
  - Integrated with OpenAPI documentation via @asteasolutions/zod-to-openapi

### Logging
- **Pino**: Fast, low-overhead logger
  - Version: 10.0.0
  - Configurable log levels via LOG_LEVEL environment variable

### Documentation
- **EJS**: Embedded JavaScript templates
  - Version: 3.1.10
  - Used for rendering Swagger UI documentation

### Development Tools
- **Nodemon**: Development server with auto-restart
  - Version: 3.1.9
- **TSX**: TypeScript execution environment
  - Version: 4.20.6
  - Used for running TypeScript files directly

## Development Setup

### Prerequisites
1. **Node.js v22.0.0 or higher**
   - Download: https://nodejs.org/en/download/
   - Or use Node Version Manager (NVM)
2. **SQLite3** (optional - only for direct database access)
   - Pre-installed on macOS or via package managers

### Environment Configuration
- `.env` file in project root with the following variables:
  ```
  NODE_ENV=development
  NODE_PORT=3000
  LOG_LEVEL=DEBUG
  DB_PATH=./database.sqlite
  ```

### Setup Commands
1. Install dependencies: `npm install`
2. Run database migrations: `npm run migrate`
3. Start development server: `npm run local`

## Technical Constraints

### TypeScript Configuration
- Strict mode enabled
- Null checks enforced
- No implicit any types
- Strict function types
- Strict property initialization

### Clean Architecture Requirements
1. Strict separation of concerns between layers
2. Framework-agnostic business logic
3. Dependency inversion through interfaces
4. Pure entities with no framework dependencies

### Naming Conventions
- **Interfaces**: Prefixed with `I` (e.g., `ILoginUserController`)
- **Builders**: Static factory classes suffixed with `Builder` (e.g., `LoginUserControllerBuilder`)
- **DTOs**: Suffixed with `DTO` (e.g., `LoginUserBodyDTO`)
- **Schemas**: Zod schemas suffixed with `Schema` (e.g., `LoginUserBodyDTOSchema`)
- **Models**: Domain models suffixed with `Model` (e.g., `UserModel`)
- **Repositories**: Suffixed with `Repository` (e.g., `FindUserRepository`)
- **Use Cases**: Suffixed with `UseCase` (e.g., `LoginUserUseCase`)
- **Versioning**: Controllers use version prefix (e.g., `LoginUserV1Router`)
- **Database Models**: Suffixed with `DM` (e.g., `UserDM`)
- **Files**: `{feature}.{type}.ts` (e.g., `loginUser.controller.ts`)

### Call Graph Constraints
- Strict call graph: Router → Controller → UseCase → Repository
- Never skip layers or call across layers

## Dependencies

### Production Dependencies
- **@asteasolutions/zod-to-openapi**: Converts Zod schemas to OpenAPI specifications
- **@fastify/cors**: CORS support for Fastify
- **better-sqlite3**: SQLite database driver
- **dayjs**: Date manipulation library
- **dotenv**: Environment variable management
- **ejs**: Templating engine for Swagger UI
- **fastify**: Web framework
- **kysely**: SQL query builder
- **pino**: Logging library
- **zod**: Schema validation

### Development Dependencies
- **@types/better-sqlite3**: TypeScript types for better-sqlite3
- **@types/ejs**: TypeScript types for EJS
- **@types/node**: TypeScript types for Node.js
- **nodemon**: Development server with auto-restart
- **tsx**: TypeScript execution environment
- **typescript**: TypeScript compiler

## Tool Usage Patterns

### Database Access
- Always use the SqliteClient singleton instance
- Access via `SqliteClient.instance.getDb()`
- All database operations should be encapsulated in repositories

### Environment Variables
- Access only through `EnvHelper`
- Never use `process.env` directly

### Error Handling
- Use `ErrorModel` for consistent error representation
- Proper HTTP status codes based on error type
- Sanitize error details in production

### Response Formatting
- Use `ResponseManager` for consistent response formatting
- All responses follow the same structure
- Appropriate HTTP status codes

### Logging
- Use the LoggerClient for all logging
- Respect configured log levels
- Structured logging with proper context

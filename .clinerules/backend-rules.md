## Project Overview
- TypeScript (strict mode)
- Fastify (web framework)
- Kysely (SQL query builder)
- SQLite (database via better-sqlite3)
- Zod (validation)
- Pino (logging)
- EJS (templating for Swagger UI)

## Core Principles
1. **Clean Architecture** with KISS and SOLID principles
   - Single Responsibility Principle (SRP)
   - Open/Closed Principle (OCP)
   - Liskov Substitution Principle (LSP)
   - Interface Segregation Principle (ISP)
   - Dependency Inversion Principle (DIP)
2. **Object-Oriented Programming** - Everything is class-based
3. **Composition over inheritance** - Prefer composition patterns
4. **Framework-agnostic business logic** - Infrastructure is replaceable
5. **Strict call graph:** Router → Controller → UseCase → Repository (never skip or call across)
6. **All public classes have corresponding interfaces** (prefixed with `I`) in the same file
7. **Dependency Injection** through constructors using interfaces
8. **Pure entities** - Models & DTOs are side-effect free and don't import framework code

## Core Layers
1. Routers
- **Responsibility:** Define the HTTP routes and map them to controllers.
- **Details:**
  - Register Fastify routes.
  - Attach route-specific middlewares or hooks if necessary.
2. Controllers
- **Responsibility:** Handle incoming HTTP requests and prepare responses.
- **Details:**
  - Validate Fastify request/response objects.
  - Call the appropriate Interactor (use case).
  - Translate use case output into HTTP responses.
3. Entities
- **Responsibility:** Contain **pure** domain data.
- **Subfolders:**
  - `DTOs`: Data Transfer Objects (e.g., Request/Response structures).
  - `Models`: Rich domain models with behavior (if necessary).
- **Details:**
  - No dependencies on frameworks (pure TypeScript classes/interfaces).
  - Always serializable and self-contained.

4. Use Cases
- **Responsibility:** Contain all the application-specific business logic.
- **Details:**
  - Implement the **rules** for interacting with the system.
  - Always pure and testable (no HTTP, DB, etc. here directly).
  - Should only depend on Entities and Interfaces (contracts).
5. Repositories
- **Responsibility:** Provide data from external sources (DB, APIs, etc.).
- **Details:**
  - Infrastructure adapters (database, third-party APIs, caches).
  - Always exposed through interfaces.
  - Interactors use repositories via **Dependency Inversion**.

## Infrastructure & Utilities
1. **Clients:** Database connections, loggers (in `src/clients/`)
   - Singleton pattern for connection management
   - Always expose through interfaces
   - Example: `SqliteClient.instance`
2. **Migrations:** Database schema versioning (in `src/migrations/`)
   - Use Kysely migration system
   - Naming: `YYYYMM-{order}-{description}.ts`
3. **Helpers:** Utility functions (in `src/helpers/`)
   - Pure functions only
   - No business logic

## Configuration Management
1. Use `.env` files for environment-specific configuration
2. Access environment variables only through `EnvHelper`
3. Never commit `.env` files to version control
4. Database files (*.sqlite, *.db) must be in .gitignore

## Testing Strategy
1. Use Mock implementations for repositories (e.g., `FindUserRepositoryMock`)
2. Test layers independently using interfaces
3. Integration tests should use in-memory SQLite

## Naming Conventions
- **Interfaces:** Prefixed with `I` (e.g., `ILoginUserController`)
- **Builders:** Static factory classes suffixed with `Builder` (e.g., `LoginUserControllerBuilder`)
- **DTOs:** Suffixed with `DTO` (e.g., `LoginUserBodyDTO`)
- **Schemas:** Zod schemas suffixed with `Schema` (e.g., `LoginUserBodyDTOSchema`)
- **Models:** Domain models suffixed with `Model` (e.g., `UserModel`)
- **Repositories:** Suffixed with `Repository` (e.g., `FindUserRepository`)
- **Use Cases:** Suffixed with `UseCase` (e.g., `LoginUserUseCase`)
- **Versioning:** Controllers use version prefix (e.g., `LoginUserV1Router`)
- **Database Models:** Suffixed with `DM` (e.g., `UserDM`)
- **Files:** `{feature}.{type}.ts` (e.g., `loginUser.controller.ts`)

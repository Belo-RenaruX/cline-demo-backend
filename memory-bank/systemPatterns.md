# System Patterns: Cline Demo Backend

## Architecture Overview

The Cline Demo Backend implements Clean Architecture principles, organizing code into concentric layers with dependencies pointing inward. This architecture ensures separation of concerns, testability, and maintainability.

### Layer Structure

1. **Core/Domain Layer** (Innermost)
   - Entities, models, and business rules
   - No dependencies on outer layers or frameworks
   - Pure TypeScript with no external imports

2. **Use Case Layer**
   - Application-specific business logic
   - Depends only on the domain layer
   - Orchestrates entity interactions

3. **Interface Adapter Layer**
   - Controllers, repositories, and presenters
   - Converts data between use cases and external agencies
   - Implements interfaces defined by inner layers

4. **Framework Layer** (Outermost)
   - Fastify routes, database connections, external libraries
   - Provides concrete implementations of interfaces
   - Handles communication with external systems

## Key Technical Decisions

### 1. Interface-First Design
- All public classes have corresponding interfaces (prefixed with `I`)
- Enables dependency inversion and mockability
- Facilitates testing and future refactoring

### 2. Builder Pattern for Dependency Injection
- Static factory methods create fully-configured instances
- Encapsulates dependency creation and wiring
- Simplifies client code and improves readability

### 3. Repository Pattern for Data Access
- Abstracts database operations behind interfaces
- Decouples business logic from data access mechanisms
- Allows for easy swapping of data sources

### 4. Singleton Pattern for Infrastructure Clients
- Single instances for database and logger connections
- Prevents resource duplication
- Centralized configuration management

### 5. Strategy Pattern for Response Handling
- Different strategies for various response types
- Consistent response formatting across the application
- Extensible for new response formats

## Design Patterns in Use

### Creational Patterns
- **Builder Pattern**: Used for constructing complex objects (e.g., `LoginUserControllerBuilder`)
- **Singleton Pattern**: Used for database and logger clients
- **Factory Method Pattern**: Used in builders to create instances with dependencies

### Structural Patterns
- **Adapter Pattern**: Used in repositories to convert between database models and domain entities
- **Facade Pattern**: Used in controllers to simplify complex subsystem interactions
- **Proxy Pattern**: Used in response managers to control access to response formatting

### Behavioral Patterns
- **Strategy Pattern**: Used for different response formatting strategies
- **Template Method Pattern**: Used in base classes to define algorithm skeletons
- **Command Pattern**: Used in use cases to encapsulate requests as objects

## Component Relationships

### Router → Controller
- Router defines HTTP routes and maps them to controller methods
- Router passes Fastify request/reply objects to controller
- Example: `LoginUserV1Router` → `LoginUserController.handle()`

### Controller → Use Case
- Controller validates input using Zod schemas
- Controller calls use case with validated input
- Controller formats use case output using response manager
- Example: `LoginUserController` → `LoginUserUseCase.login()`

### Use Case → Repository
- Use case defines business logic and orchestrates operations
- Use case calls repository methods to access data
- Use case operates on domain entities
- Example: `LoginUserUseCase` → `FindUserRepository.execute()`

### Repository → Database
- Repository implements data access logic
- Repository converts between database models and domain entities
- Repository uses database client to execute queries
- Example: `FindUserRepository` → `SqliteClient.instance.getDb()`

## Critical Implementation Paths

### Authentication Flow
1. `POST /v1/users/login` → `LoginUserV1Router`
2. `LoginUserV1Router` → `LoginUserController.handle()`
3. `LoginUserController` validates input with `LoginUserBodyDTOSchema`
4. `LoginUserController` → `LoginUserUseCase.login()`
5. `LoginUserUseCase` → `FindUserRepository.execute()`
6. `FindUserRepository` queries database for user
7. `LoginUserUseCase` creates `UserModel` and validates credentials
8. `LoginUserController` formats response using `ResponseManager`
9. HTTP response returned to client

### Error Handling Path
1. Exception thrown in any layer
2. Exception caught in controller's try/catch block
3. `ErrorModel.fromError()` converts exception to standardized format
4. `ResponseManager` determines appropriate HTTP status code
5. Error response returned to client

## Dependency Injection Approach

### Constructor Injection
- Dependencies are passed via constructor parameters
- Interfaces are used for all dependencies
- Example:
  ```typescript
  constructor(
    private readonly useCase: ILoginUserUseCase,
    private readonly responseManager: IResponseManager,
  ) {}
  ```

### Builder Classes
- Static factory methods create fully-configured instances
- Handle dependency creation and wiring
- Example:
  ```typescript
  static build(): LoginUserController {
    return new LoginUserController(
      LoginUserUseCaseBuilder.build(),
      ResponseManagerBuilder.buildData(LoginUserOutputDTOSchema),
    );
  }
  ```

## Testing Strategy

### Unit Testing
- Each layer is tested in isolation
- Dependencies are mocked using interfaces
- Example: Testing `LoginUserUseCase` with `FindUserRepositoryMock`

### Integration Testing
- Tests interaction between multiple layers
- Uses in-memory SQLite database
- Focuses on end-to-end flows

## Performance Considerations

### Database Optimization
- Efficient query patterns
- Proper indexing
- Connection pooling

### Response Optimization
- Minimal payload size
- Appropriate caching headers
- Compression when appropriate

## Security Patterns

### Input Validation
- All inputs validated with Zod schemas
- Strict type checking
- Sanitization of user input

### Authentication
- Password comparison in domain model
- Proper error messages (not revealing sensitive information)
- Rate limiting considerations

### Error Handling
- Sanitized error messages in production
- Appropriate HTTP status codes
- Logging of errors without sensitive data

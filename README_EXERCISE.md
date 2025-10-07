# Cline Demo Exercise

## Overview

This exercise demonstrates Cline's capabilities when working with a Clean Architecture TypeScript backend and creating a complementary frontend. We'll run two different prompts and analyze the results to understand how Cline can effectively work with complex codebases and create new projects that follow architectural patterns.

## Exercise Goals

- Demonstrate Cline's ability to understand and work with Clean Architecture
- Show how Cline can implement new features following established patterns
- Demonstrate Cline's ability to create a new project that integrates with an existing one
- Highlight Cline's reasoning and approach to full-stack software engineering tasks

## Instructions

1. Run each prompt in sequence
2. Observe how Cline analyzes the codebase
3. Review the implementation approach and results
4. Compare the differences in approach between the two prompts

## Prompt 1

Paste your first prompt in the space below:

```
Based on the current project and using the cline rules + the existing memory bank I want to implement the following:

A new endpoint that allows a new user to be registered into the database. This endpoint should have the same architectural pattern as the rest of the code. It should create the necessary DTOs for both input and output as well as validate the data based on that.

Do not implement any type of encryption for this new endpoint.

The DTOs should include the necessary information to create the swagger docs and also create the swagger docs config to show this new endpoint.

Reuse the existing code as much as possible and only implement new code, do not modify existing code unless strictly necessary.

Using the existing Swagger docs, test the new endpoint and all the error cases to ensure consistency.

Update the memory bank if necessary.

```

### Expected Results from Prompt 1

- Cline will analyze the existing codebase structure to understand the current architecture
- Cline will implement a new user registration endpoint following the established Clean Architecture patterns
- The implementation will include proper DTOs for input/output, validation, and Swagger documentation
- The solution will maintain separation of concerns and follow interface-first design
- All error cases will be properly handled and tested via Swagger UI

## Prompt 2

Paste your second prompt in the space below:

```
Based on the current project and using the cline rules + the existing memory bank I want to implement the following:

In a sub folder implement a new small React project using vite to implement the 2 endpoints existing in the implemented backend. This project should have its own package.json, that means it should be a standalone project and should not use anything from the backend one.

This React project should use MUI for styling and follow a similar architectural pattern as the backend project. Keep distinct layers clear and do not break communication between layers

Implement atomic components to maintain scalability.

Only install dependencies if strictly necessary, like React, MUI, an http client like undici to consume the endpoints, etc. Try to use native code as much as possible.

Test the implementation against the existing backend, so run both projects and run all test cases necessary: Success, Error, etc.

Update the memory bank if necessary.
```

### Expected Results from Prompt 2

- Cline will create a completely new React frontend project using Vite
- The frontend will consume both backend endpoints (login and the newly created registration)
- The implementation will follow a similar architectural pattern as the backend with clear separation of layers
- The UI will use Material-UI (MUI) components with an atomic design approach
- The solution will be tested against the running backend to verify all success and error cases

## Learning Outcomes

By comparing the results of these two prompts, we can observe:

1. How Cline understands and adapts to architectural patterns in both backend and frontend contexts
2. The consistency of implementations across different tasks and technologies
3. How Cline reasons about software design decisions in a full-stack environment
4. The ability to maintain established patterns while implementing new features
5. How Cline can create complementary projects that work together effectively

## Conclusion

This exercise showcases how Cline can effectively work with existing codebases and create new complementary projects that follow specific architectural patterns and coding standards. By observing the results, we can better understand Cline's capabilities in real-world full-stack software engineering scenarios, from extending backend APIs to creating frontend applications that consume them.

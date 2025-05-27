# CI setup tools
Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

## TypeScript/JavaScript Ecosystem
1. Linting (Code Quality & Style):
    * ESLint: For code quality and potential errors (with @typescript-eslint/parser & @typescript-eslint/eslint-plugin for TS).
    * Prettier: For consistent code formatting.
    * Execution: eslint ., prettier --check .
2. Testing (Correctness):
    * Jest / Vitest: Popular "all-in-one" test frameworks (runner, assertions, mocking).
    * React Testing Library (RTL): For testing React components user-centrically (used with Jest/Vitest).
    * Cypress / Playwright: For End-to-End browser testing.
    * Execution: jest, vitest run, cypress run
3. Building (Deployment Prep):
    * Frontend:
        * Vite: Modern, fast bundler and dev server (uses Rollup).
        * Webpack: Powerful, highly configurable bundler.
    * Backend/Libraries:
        * tsc (TypeScript Compiler): Transpiles TS to JS.
        * esbuild / Rollup / tsup: Fast bundlers, good for libraries.
    * Execution: vite build, webpack, tsc

## C# / .NET Ecosystem
1. Linting / Code Analysis (Quality, Style, Issues):
    * .NET Analyzers (Roslyn): Built-in and NuGet-based (e.g., Microsoft.* CodeAnalysis.NetAnalyzers, StyleCop.Analyzers). Configured via .editorconfig.
    * dotnet format: For code style enforcement.
    * SonarQube/SonarCloud: Comprehensive static analysis platform.
    * Execution: Runs during dotnet build; dotnet format --verify-no-changes.
2. Testing (Correctness):
    * Test Runner: dotnet test.
    * Frameworks: MSTest, NUnit, xUnit.net.
    * Mocking: Moq, NSubstitute, FakeItEasy.
    * Assertions: Built-in to frameworks or FluentAssertions.
    * Coverage: Coverlet, AltCover.
Execution: dotnet test (with optional coverage flags).
3. Building (Deployment Prep):
    * dotnet build: Compiles the project.
    * dotnet publish: Prepares for deployment (includes dependencies, optimizes).
    * dotnet pack: Creates NuGet packages (for libraries).
    * Docker CLI: For containerizing applications (docker build).
    * Execution: dotnet build, dotnet publish, dotnet pack.

# What alternatives are there to set up the CI besides Jenkins and GitHub Actions?
## Cloud-Hosted / SaaS:
* GitLab CI/CD: Tightly integrated with the GitLab platform; powerful & flexible.
* Azure Pipelines (Azure DevOps): Comprehensive Microsoft suite; strong for .NET/Windows & enterprise.
* Bitbucket Pipelines: Built directly into Bitbucket Cloud; simple for Bitbucket users.
* CircleCI: Fast, flexible, good Docker & macOS support; rich feature set.
* Drone CI: Modern, container-native (everything in Docker); simple YAML.
* Buildkite: Hybrid model – SaaS control plane, self-hosted agents for security/control.

## Self-Hosted:
* TeamCity: Powerful, user-friendly UI, from JetBrains; feature-rich.
* GoCD: Focus on complex CD pipelines & visualization.

## Cloud Provider Specific:
* AWS CodePipeline / CodeBuild: Deeply integrated with AWS services.
* Google Cloud Build: Fast, scalable, native to Google Cloud Platform.


## TS Template

Scaffolding for a basic Node.js project. It supports:

- [TypeScript](https://www.typescriptlang.org/)
- A test runner (through [Mocha](https://mochajs.org/))
- Containerization (through Docker)
- Generating and uploading artifacts (through [Artifactory](https://wassonece.jfrog.io))
- Precommit hooks (via Husky) for
  - Formatting
  - Testing
  - Linting
  - Building

### Requirements

- [Docker](https://www.docker.com/products/docker-desktop)
- [GNU Make](https://help.ubuntu.com/community/InstallingCompilers)

## Setup

Create the TS Docker image by running `./scripts/setup-container.sh`. Then run any of the commands in the [Commands](###Commands) section.

### Commands

    make install    # Install package dependencies
    make build      # Generate build artifacts from source
    make test       # Run test suites on files in `test/`
    make pretty     # Transform source code into standard format
    make lint       # Static code analysis
    make clean      # Remove build artifacts
    
# <project name>

## Goal
// Describe what the process aims to do and what it offers to consumers

## API
// Describe the API for interacting with the process

## Building
// Describe how to build the process from source

## Configuration
// Describe how to configure the process at runtime

## Deployment
// Describe how the process should be deployed

## Monitoring
// Describe how to tell if the process is running correctly

# Hooks

To make development a little easier, included in this repo are a couple
Git hooks for when you checkout a branch/commit or after committing code.
On each of these actions the `version.h` file will be recreated with the
commit hash. You can install these hooks to the repository by running
`make install-hooks`.

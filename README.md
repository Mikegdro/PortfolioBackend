[![Node.js CI](https://github.com/Mikegdro/PortfolioBackend/actions/workflows/node.js.yml/badge.svg)](https://github.com/Mikegdro/PortfolioBackend/actions/workflows/node.js.yml)

# Backend

The backend is going to be a Backend for frontend, to serve and alter data from a main database which is developed currently on Postgres, but the objective is to use design-patterns that allow an easy replacement of the data source without much configuration, ideally just injecting a dependency that follows an interface so just changing the injected resource would allow to change the datasource in a second.

The main API is developed using NodeJS, Typescript & Express, using also Drizzle as an ORM to have 'End-to-End typesafety'.


## To-Do
Replicate also the same API in Golang, just to test a new CLI tool developed by [MelkeyDev](https://www.youtube.com/@MelkeyDev) named [Go-Blueprint](https://go-blueprint.dev), in that page you can find a WEB Configuration to generate the command to execute with the blueprint tool.

For this project the configuration was:
    · Name: GoAPI
    · Database: Postgres
    · Framework: Standard Library
    · Advanced: 
        - CI/CD Workflow
        - Websocket endpoint

## Backend Architecture

![BackendArchitecture](./docs/Backend.png)

## Database model

[E-R Digram](./docs/PortfolioDB.png)

### Herramientas adicionales


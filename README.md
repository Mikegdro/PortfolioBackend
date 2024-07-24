[![Node.js CI](https://github.com/Mikegdro/PortfolioBackend/actions/workflows/node.js.yml/badge.svg)](https://github.com/Mikegdro/PortfolioBackend/actions/workflows/node.js.yml)

# Backend

The backend is going to be a Backend for frontend, to serve and alter data from a main database which is developed currently on Postgres, but the objective is to use design-patterns that allow an easy replacement of the data source without much configuration, ideally just injecting a dependency that follows an interface so just changing the injected resource would allow to change the datasource in a second.

The main API is developed using NodeJS, Typescript & Express, using also Drizzle as an ORM to have 'End-to-End typesafety'.

# Installation

This API is fully automated with docker & docker compose, both for a dev environment and a production environment.

The only thing you must have is a .env for docker to retrieve those env variables and spin up the services accordingly.

```
DB=postgres://username:password@127.0.0.1:5432/portfolio
DB_URL=postgres://username:password@127.0.0.1:5432/portfolio

DB_NAME=portfolio

POSTGRES_USER=username
POSTGRES_PASSWORD=password

PGADMIN_EMAIL=email
PGADMIN_PASSWORD=password
```

Those are the only needed environment variables, and the only env variable needed for production is DB, the rest are to spin up additional services for your local machine.

# Deployment

In my case i used a VPS from Hetzner for just 5€ a month, and i installed Coolify in it, then i purchased a Domain for Cloudflare, they have a DNS so you can configure the IP for you domain and subdomain, and i configured Coolify to accept https calls to that domain and configured the consecuent subdomains.

You can automate deployments with Webhooks in Coolify, so when you push to your main branch a call triggers to the server to update the container.

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


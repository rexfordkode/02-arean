<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Starter Auth

A starter authentication project using NestJS, Drizzle ORM, Passport, JWT, and Zod for environment validation.

## Features
- JWT authentication
- OAuth (Google, GitHub)
- Drizzle ORM (PostgreSQL)
- Environment variable validation with Zod
- Swagger API docs (development only)
- Role-based access control

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- PostgreSQL

### Installation
```sh
pnpm install
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```sh
cp .env.example .env
```

Example:
```
NODE_ENV=development
PORT=8000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

### Running the App
- Development:
  `pnpm start:dev`
- Production:
  `pnpm build && pnpm start:prod`

### Swagger API Docs
- Available at `/api-docs` when `NODE_ENV=development` or `NODE_ENV=local`.

### Drizzle ORM
- Generate migrations:
  `pnpm drizzle:generate --name migration_name`
- Run migrations:
  `pnpm drizzle:migrate --name migration_name`
- Push schema:
  `pnpm drizzle:push`

### Testing
- Run all tests:
  `pnpm test`
- Watch mode:
  `pnpm test:watch`
- End-to-end:
  `pnpm test:e2e`

### Linting & Formatting
- Lint:
  `pnpm lint`
- Format:
  `pnpm format`

## Project Structure
- `src/` - Main source code
- `test/` - Test files
- `.env` - Environment variables
- `drizzle.config.ts` - Drizzle ORM config

## Notes
- Use Zod schemas in `env-config.dto.ts` for environment validation.
- Use `ConfigService` or inject the validated config globally for type-safe config access.

---

Feel free to contribute or open issues!

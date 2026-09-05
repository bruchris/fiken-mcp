# Fiken MCP

Open-source TypeScript client, Model Context Protocol server and CLI for Fiken. Unofficial; not affiliated with Fiken AS.

Companies, accounts, contacts, purchases and purchase attachments.

## Package and release status

[@bruchris/fiken-mcp](packages/fiken-mcp) version 0.1.0 is prepared but not yet published to npm. Requires Node 22.14+; Node 24 is recommended. The following installation command applies after the first npm release.

```sh
npx -y @bruchris/fiken-mcp
```

Set FIKEN_API_TOKEN in your client environment. Import the typed client from @bruchris/fiken-mcp/client without launching MCP or loading environment files. Fiken restricts personal-key use in third-party applications; obtain required OAuth/vendor authorization before offering an integration to other firms. See [Fiken API documentation](https://api.fiken.no/api/v2/docs/).

## Approval

MCP writes return a preview until confirm=true; the client must obtain approval before confirming. CLI writes require --confirm. For paid purchases, take the payment date and NOK amount from the booked bank transaction. Attach a receipt to the purchase; do not duplicate it into Fiken Innboks. The model chooses accounting fields after reading the receipt and similar bookings.

## Development

```sh
npm ci
npm test
npm run typecheck
npm run build
npm run test:tooling
npm run check:public
npm run check:secrets
```

This repository contains only the Fiken package in packages/fiken-mcp and its supporting tooling. Its root workspace is private to prevent accidental publication of the tooling. The Freddy application source remains private and is excluded.

[Package documentation](packages/fiken-mcp/README.md) · [Public docs](https://bruchris.github.io/fiken-mcp/) · [Hosting](docs/hosting.md) · [Contributing](CONTRIBUTING.md) · [Releases](docs/releases.md) · [Security](SECURITY.md)

MIT license.

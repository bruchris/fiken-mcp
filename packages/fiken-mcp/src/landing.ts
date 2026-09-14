import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function packageVersion(): string {
  try {
    const packageJsonPath = join(dirname(fileURLToPath(import.meta.url)), "..", "package.json");
    const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8")) as { version?: string };
    return pkg.version?.trim() || "0.1.0";
  } catch {
    return "0.1.0";
  }
}

export function renderFikenLandingPage(options?: { version?: string }): string {
  const version = options?.version?.trim() || packageVersion();
  const escapedVersion = escapeHtml(version);
  const build = process.env.MCP_BUILD_ID?.trim();
  const buildNote = build ? ` · build ${escapeHtml(build)}` : "";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fiken MCP</title>
<meta name="description" content="Open-source Fiken typed client, MCP server and CLI. Hosted Streamable HTTP at /mcp.">
<meta name="generator" content="@bruchris/fiken-mcp ${escapedVersion}">
<style>body{margin:0;background:#f6f4ef;color:#222820;font:18px/1.65 system-ui,sans-serif}main{max-width:850px;margin:70px auto;padding:0 24px}h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.1;letter-spacing:-.04em}h2{font-size:1.35rem}a{color:#245c3a}section{padding:24px 0;border-top:1px solid #c9cec4}code,pre{font-size:15px}pre{overflow:auto;padding:18px;background:#e9ede4}small{display:block;color:#56604f}nav{display:flex;gap:20px;flex-wrap:wrap}a:focus-visible{outline:3px solid #245c3a;outline-offset:4px}</style>
</head>
<body><main>
<small>UNOFFICIAL · OPEN SOURCE · MIT · v${escapedVersion}${buildNote}</small>
<h1>Fiken.<br>Tools for your agent.</h1>
<p>A typed client, MCP server and CLI for Fiken. Companies, accounts, contacts, purchases and purchase attachments.</p>
<nav>
<a href="https://www.npmjs.com/package/@bruchris/fiken-mcp">npm</a>
<a href="https://github.com/bruchris/fiken-mcp">Source</a>
<a href="#local-setup">Local setup</a>
<a href="#hosted-setup">Hosted setup</a>
<a href="https://github.com/bruchris/fiken-mcp/blob/main/SECURITY.md">Privacy / security</a>
<a href="/healthz">Status</a>
</nav>
<section id="local-setup">
<h2>Local setup</h2>
<p>On a laptop, prefer stdio. Cursor can load vendor credentials from a gitignored <code>envFile</code>. Do not put secrets in <code>mcp.json</code>.</p>
<pre><code>npx -y @bruchris/fiken-mcp</code></pre>
<p>Local Streamable HTTP for transport tests: <code>npm run http:fiken</code> on <code>127.0.0.1:3001</code>. Path <code>B&amp;B</code> breaks npm <code>.bin</code>; use <code>node …/tsx</code> or <code>dist</code>.</p>
<p>Use your own Fiken credential in the client or host environment. The model chooses accounting fields after reading the receipt and similar bookings.</p>
</section>
<section id="hosted-setup">
<h2>Hosted setup</h2>
<p>This origin serves three routes:</p>
<ul>
<li><code>/</code> — this page</li>
<li><a href="/mcp"><code>/mcp</code></a> — Streamable HTTP MCP</li>
<li><a href="/healthz"><code>/healthz</code></a> — health</li>
</ul>
<p>Private-beta access to <code>/mcp</code> uses a host token named <code>MCP_AUTH_TOKEN</code>. That token authenticates the MCP client to <strong>this host</strong>. It is not a Fiken credential. Put the token in the OS or shell environment and send it as an <code>Authorization</code> header. Remote Cursor HTTP does not support <code>envFile</code>.</p>
<p>This host then calls Fiken with a separate vendor credential. Do not mix those layers. Cursor Authenticate / ChatGPT Sign in (MCP OAuth against this host) is not enabled on this release.</p>
<pre><code>claude mcp add --transport http fiken https://fiken.bruchris.me/mcp --header "Authorization: &lt;MCP_AUTH_TOKEN&gt;"</code></pre>
<p>Freddy imports the TypeScript client. It does not call this URL as RPC. MCP writes preview until confirmed; that confirm flag is not Freddy ApprovalService. Attach a receipt to the purchase; do not duplicate it into Fiken Innboks.</p>
</section>
<section>
<h2>Privacy and security</h2>
<p>This page never publishes keys. Hosted HTTP disables local filesystem attachment tools. Browser <code>Origin</code> values must match an exact allowlist; there is no wildcard. See <a href="https://github.com/bruchris/fiken-mcp/blob/main/SECURITY.md">SECURITY.md</a> and the <a href="https://github.com/bruchris/fiken-mcp/blob/main/docs/hosting.md">hosted setup notes</a>.</p>
</section>
<footer><small>Not affiliated with Fiken AS. Package version ${escapedVersion}. Service status: <a href="/healthz">/healthz</a>.</small></footer>
</main></body></html>`;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

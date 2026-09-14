import { describe, expect, it } from "vitest";
import { renderFikenLandingPage } from "../src/landing.js";

describe("Fiken landing page", () => {
  it("includes product content, required setup links, version, and no secrets", () => {
    const html = renderFikenLandingPage({ version: "0.1.0" });
    for (const snippet of [
      "Fiken",
      "https://www.npmjs.com/package/@bruchris/fiken-mcp",
      "https://github.com/bruchris/fiken-mcp",
      "#local-setup",
      "#hosted-setup",
      "https://github.com/bruchris/fiken-mcp/blob/main/SECURITY.md",
      "/healthz",
      "/mcp",
      "0.1.0",
      "MCP_AUTH_TOKEN",
    ]) {
      expect(html).toContain(snippet);
    }
    expect(html).not.toContain("FIKEN_CLIENT_SECRET");
    expect(html).not.toContain("Bearer ");
    expect(html).not.toMatch(/sk[-_]|api[_-]?key\s*[:=]/i);
  });
});

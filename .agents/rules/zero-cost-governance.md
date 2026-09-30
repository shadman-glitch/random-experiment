# Rule: Zero-Cost Financial Governance

## Scope
Applies to all agents, team members, scripts, dependencies, and external connections within `random-experiment`.

## Directives
1. **Zero Paid APIs**: Absolutely NO paid APIs, paid token endpoints, paid subscription services, or metered cloud services are permitted.
2. **Free Infrastructure Only**:
   - Vercel Free Hobby Tier (Serverless & Static Hosting)
   - GitHub Free Tier (Repositories, Actions CI/CD)
   - Self-hosted open-source on user's existing VPS (Docker, Nginx, Linux)
   - Local in-browser storage (localStorage, IndexedDB) and mock serverless layers
3. **Open-Source Libraries Only**:
   - All third-party libraries must be verified permissive licenses (MIT, Apache 2.0, BSD-3-Clause, ISC).
   - Zero commercial licensing or trial dependencies.

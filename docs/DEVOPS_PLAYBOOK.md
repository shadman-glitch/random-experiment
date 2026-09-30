# DevOps Playbook & Free Hosting Architecture
**Project**: AURA — Next-Gen Spatial Audio & Smart Wearables  
**Repository**: `random-experiment`  
**Lead Engineer**: Agent 6 (Cloud & DevOps Engineer)  
**Status**: APPROVED by CEO | Flaw Hunter Verified

---

## 1. Zero-Cost Infrastructure Strategy
The entire stack is engineered to run at $0.00 ongoing cost:
1. **Primary Hosting: Vercel Free Hobby Tier**
   - Automatically builds and deploys on `git push origin main`.
   - Free SSL/TLS certificates via Let's Encrypt.
   - Global Edge CDN caching with zero configuration.
   - Vercel Serverless Functions under `/api/*` within generous free limits.
2. **Alternative Self-Hosting: User VPS**
   - Lightweight Docker container based on `nginx:alpine` (<25MB image size).
   - `docker-compose.yml` for single-command deployment (`docker compose up -d`).
   - One-click bash script `deploy-vps.sh` for remote VPS updating.
3. **CI/CD Automation: GitHub Actions**
   - Automated testing on each commit to `main`.

---

## 2. Deployment Configurations

### 2.1 Vercel (`vercel.json`)
```json
{
  "version": 2,
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### 2.2 Docker & Nginx (`Dockerfile` & `nginx.conf`)
- Production-grade Nginx configuration with gzip compression, cache headers for static assets, and SPA fallback routing.

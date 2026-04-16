# Deployment Guide — prodesarrollo

## Architecture

```
git push main
    ↓
GitHub Actions (free runner)
    ├─ docker build (con NEXT_PUBLIC_* como build-args)
    └─ docker push → ghcr.io/mrjuanblack/prodesarrollo:latest
    ↓
SSH al VPS
    ├─ docker pull (baja imagen ya construida)
    └─ docker compose up -d app
    ↓
Entrypoint: drizzle-kit migrate → tsx seed.ts → next start
```

**Stack en VPS**: Docker Compose + Traefik (reverse proxy + TLS) + Postgres 17 + Next.js.

**DNS**: Cloudflare (proxy habilitado, SSL/TLS mode Full strict).

**Storage**: Cloudflare R2 (S3-compatible) con dominio custom.

---

## Setup from scratch (new VPS)

### 1. VPS: Install Docker

```bash
# Docker Engine + Compose plugin
curl -fsSL https://get.docker.com | sh

# Verify
docker --version
docker compose version
```

### 2. VPS: Install & configure Traefik

```bash
# Create shared network (all apps join this)
docker network create traefik-network

# Create Traefik directory
mkdir -p /projects/traefik
cd /projects/traefik

# Create acme.json for Let's Encrypt certs
touch acme.json
chmod 600 acme.json
```

Create `/projects/traefik/docker-compose.yml`:

```yaml
services:
  traefik:
    image: traefik:v3
    container_name: traefik
    restart: unless-stopped
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=TU_EMAIL@ejemplo.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./acme.json:/acme.json
    networks:
      - traefik-network

networks:
  traefik-network:
    external: true
```

```bash
docker compose up -d
```

### 3. VPS: Generate SSH key for GitHub Actions

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github-actions -N "" -C "github-actions-deploy"
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys
```

Save the private key — you'll paste it as a GitHub Secret later:

```bash
cat ~/.ssh/github-actions
```

### 4. VPS: Generate deploy key for the repo

```bash
ssh-keygen -t ed25519 -f ~/.ssh/<repo-name> -N "" -C "deploy-<repo-name>"
cat ~/.ssh/<repo-name>.pub
```

Add the public key in GitHub: repo → Settings → Deploy keys → Add deploy key (read-only).

Add to `~/.ssh/config`:

```
Host github-<repo-name>
    HostName github.com
    User git
    IdentityFile ~/.ssh/<repo-name>
    IdentitiesOnly yes
```

### 5. GitHub: Create GHCR pull token (one per GitHub account, reusable across repos)

1. GitHub → Settings (account) → Developer settings → Personal access tokens → **Tokens (classic)**
2. Generate new token (classic)
3. Name: `vps-ghcr-pull`
4. Expiration: 90 days
5. Scope: only `read:packages`
6. Generate and copy

On the VPS:

```bash
echo "TOKEN" | docker login ghcr.io -u <github-username> --password-stdin
```

### 6. DNS: Configure domain in Cloudflare

1. Add domain to Cloudflare (if new) — update nameservers at registrar
2. Add DNS records:

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `@` | VPS public IP | DNS only (initially) |
| A | `www` | VPS public IP | DNS only (initially) |

3. SSL/TLS → Overview → **Full (strict)**
4. Wait for DNS propagation: `nslookup yourdomain.com` should return VPS IP
5. After TLS cert is issued by Traefik, switch both records to **Proxied** (orange cloud)

### 7. Repo: Add required files

These files must exist in the repo:

- `Dockerfile` — multi-stage build
- `docker-entrypoint.sh` — migrate + seed + next start
- `docker-compose.yml` — db + app services with Traefik labels, `image:` pointing to GHCR
- `.dockerignore`
- `.github/workflows/deploy.yml` — build, push to GHCR, SSH deploy

### 8. GitHub: Add repo secrets

Repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Value |
|---|---|
| `NEXT_PUBLIC_STORAGE_URL` | Public URL for file storage (e.g. `https://cdn.yourdomain.com`) |
| `DATABASE_URL` | `postgresql://x:x@localhost/x` (dummy, only for build) |
| `VPS_HOST` | VPS public IP |
| `VPS_USER` | `root` |
| `VPS_SSH_KEY` | Content of `~/.ssh/github-actions` private key |

### 9. VPS: Clone repo and create .env

```bash
mkdir -p /projects/<repo>
cd /projects/<repo>
git clone git@github-<repo-name>:<github-username>/<repo>.git .

# Create production .env (NOT committed to git)
nano .env
```

Minimum `.env` contents:

```env
DATABASE_URL="postgresql://postgres:STRONG_PASSWORD@db:5432/dbname"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="STRONG_PASSWORD"
POSTGRES_DB="dbname"
APP_DOMAIN="yourdomain.com"

# App-specific vars (S3, JWT, etc.)
S3_ENDPOINT="..."
S3_REGION="auto"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="..."
NEXT_PUBLIC_STORAGE_URL="https://cdn.yourdomain.com"
JWT_SECRET="..."
JWT_EXPIRES_IN="15m"
```

### 10. Deploy

```bash
# First time: start everything
docker compose up -d

# After that: just push to main — GitHub Actions handles it
git push origin main
```

---

## What lives where

| Dato | Dónde vive | Por qué |
|---|---|---|
| `NEXT_PUBLIC_STORAGE_URL` | GitHub Secret + `.env` VPS | Build-time (inlined por Next.js) + runtime |
| `DATABASE_URL` | GitHub Secret (dummy) + `.env` VPS (real) | Build: evita throw en config.ts. Runtime: conexión real |
| S3 keys, JWT, passwords | Solo `.env` en VPS | Nunca salen del servidor |
| SSH key de Actions | GitHub Secret `VPS_SSH_KEY` | Para que Actions haga deploy |
| GHCR token (classic PAT) | `~/.docker/config.json` en VPS | Para `docker pull` de imagen privada |

---

## Files involved

| File | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | CI/CD: build → push GHCR → SSH deploy |
| `Dockerfile` | Multi-stage build (node:22-alpine) |
| `docker-entrypoint.sh` | Migrate → seed → next start |
| `docker-compose.yml` | Services: db (postgres) + app (GHCR image) + Traefik labels |
| `.dockerignore` | Excludes node_modules, .next, .env, etc. |
| `.env` (VPS only, gitignored) | All runtime secrets |

---

## How to deploy

Push a `main` → automático. Eso es todo.

Para deploy manual (sin push):
1. GitHub → Actions → "Build & Deploy" → "Run workflow" (requiere agregar `workflow_dispatch` al trigger).
2. O en el VPS directamente: `docker pull ghcr.io/mrjuanblack/prodesarrollo:latest && cd /projects/prodesarrollo && docker compose up -d app`.

---

## How to add a new app to the same VPS

### 1. Repo setup

Crear en el nuevo repo:
- `Dockerfile` (copiar y adaptar)
- `docker-entrypoint.sh`
- `docker-compose.yml` — cambiar:
  - `container_name` (ej. `miapp-db`, `miapp-app`)
  - `image: ghcr.io/<github-username>/<repo>:latest`
  - Traefik labels: cambiar todos los prefijos `prodesarrollo-*` por `miapp-*` y `APP_DOMAIN` por el nuevo dominio
  - Volume name (ej. `miapp-pgdata`)
- `.github/workflows/deploy.yml` — copiar, cambiar:
  - `IMAGE: ghcr.io/<github-username>/<repo>`
  - Path en el deploy SSH (`cd /projects/<repo>`)
- `.dockerignore`

### 2. GitHub Secrets

Agregar los mismos 5 secrets en el nuevo repo (con valores correspondientes al nuevo proyecto). `VPS_HOST`, `VPS_USER` y `VPS_SSH_KEY` son los mismos si es el mismo VPS.

### 3. VPS

```bash
mkdir -p /projects/<repo>
cd /projects/<repo>
git clone git@github-<repo>:<github-username>/<repo>.git .
nano .env
docker compose up -d
```

### 4. DNS (Cloudflare)

- Agregar registro A para el nuevo dominio → IP del VPS (DNS only al inicio)
- Esperar propagación → verificar cert → activar proxy (nube naranja)

### 5. Deploy key

Crear nueva deploy key SSH para el nuevo repo (ver paso 4 del setup from scratch).

### 6. Red de Traefik

No hay que hacer nada extra — todos los proyectos comparten `traefik-network` (external). Traefik descubre automáticamente los nuevos contenedores por labels.

---

## When the GHCR token expires

El PAT classic con scope `read:packages` tiene fecha de expiración (recomendado: 90 días). GitHub envía email de aviso antes de que expire.

### Renovar el token

1. GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click en el token `vps-ghcr-pull` → **Regenerate token**
3. Seleccionar nueva expiración (90 días)
4. Copiar el nuevo token

### Actualizar en el VPS

```bash
echo "NUEVO_TOKEN" | docker login ghcr.io -u <github-username> --password-stdin
```

Eso actualiza `~/.docker/config.json`. No hay que reiniciar nada — el próximo `docker pull` usará el nuevo token.

### Qué pasa si se vence sin renovar

- `docker pull` falla con `401 Unauthorized`
- La app **sigue corriendo** con la última imagen (no se cae)
- GitHub Actions sigue funcionando (usa `GITHUB_TOKEN`, no el PAT)
- Solo se bloquea el pull desde el VPS hasta que renueves

---

## Useful commands (VPS)

```bash
# Ver logs de la app
docker logs prodesarrollo-app --tail 100 -f

# Ver estado de los servicios
docker compose ps

# Reiniciar la app (sin rebuild)
docker compose restart app

# Forzar pull de imagen nueva + restart
docker pull ghcr.io/mrjuanblack/prodesarrollo:latest
docker compose up -d app

# Ver uso de recursos
docker stats --no-stream

# Entrar al contenedor
docker exec -it prodesarrollo-app sh

# Correr migraciones manualmente
docker exec prodesarrollo-app npx drizzle-kit migrate

# Ver logs de Postgres
docker logs prodesarrollo-db --tail 50
```

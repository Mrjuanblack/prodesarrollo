# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time args. docker-compose reads these from .env and passes them here.
# NEXT_PUBLIC_* get inlined into the client bundle by Next.js.
# DATABASE_URL is only needed so module-level validation in backend/db/config.ts
# doesn't throw during page data collection. It is scoped to this RUN only,
# so it does not persist into the final image.
ARG NEXT_PUBLIC_STORAGE_URL
ARG DATABASE_URL
ENV NEXT_PUBLIC_STORAGE_URL=$NEXT_PUBLIC_STORAGE_URL

RUN DATABASE_URL="$DATABASE_URL" npx next build

# --- Runtime ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/domain ./domain
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/seed.ts ./seed.ts
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]

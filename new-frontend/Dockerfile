FROM node:22-alpine AS builder

# этап сборки
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache ca-certificates curl && \
  npm install --legacy-peer-deps
COPY . .
RUN npm run build

# этап запуска
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN apk add --no-cache ca-certificates && \
    addgroup -g 1001 nodeapp && adduser -D -G nodeapp -u 1001 nodeapp && \
    chown -R nodeapp:nodeapp /app
USER nodeapp

EXPOSE 3000
CMD ["node", "server.js"]

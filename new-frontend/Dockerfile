FROM node:18-alpine AS builder

# этап сборки
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# этап запуска
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["node", "server.js"]




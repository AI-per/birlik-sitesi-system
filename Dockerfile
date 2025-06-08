# Bağımlılıkları yükleme aşaması
FROM node:20-slim AS deps
WORKDIR /app

# pnpm'i etkinleştir
RUN corepack enable

# package.json, lock dosyasını ve prisma şemasını kopyala
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Bağımlılıkları yükle
RUN pnpm install --frozen-lockfile

# Prisma Client'ı oluştur
# Bu adım, build sırasında Prisma Client'ın bulunabilmesi için gereklidir.
RUN pnpm prisma generate

# Derleme aşaması
FROM node:20-slim AS builder
WORKDIR /app
# pnpm'i etkinleştir
RUN corepack enable
# Bir önceki aşamadaki bağımlılıkları kopyala
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
# Uygulama kaynak kodunu kopyala
COPY . .

# Uygulamayı derle
RUN pnpm run build

# Çalıştırma aşaması
FROM node:20-slim AS runner
WORKDIR /app

# pnpm'i etkinleştir
RUN corepack enable

# Ortam değişkenlerini ayarla
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Derleme ortamından sadece gerekli dosyaları kopyala
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/scripts ./scripts/

# Uygulamayı 3000 portunda yayınla
EXPOSE 3000
# Uygulamayı başlat
CMD ["node", "server.js"] 
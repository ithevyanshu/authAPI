FROM node:20

WORKDIR /app

COPY package* .
COPY ./prisma .

RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["pnpm", "dist/index.js"]
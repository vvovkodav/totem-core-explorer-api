# builder
FROM node:lts-alpine AS builder

WORKDIR /usr/src/explorer-api

RUN apk add --no-cache git && npm i glob rimraf

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# production
FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/explorer-api

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/explorer-api/dist ./dist

CMD ["node", "dist/main"]

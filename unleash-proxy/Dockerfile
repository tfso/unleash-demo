FROM node:14-alpine as builder

WORKDIR /unleash-proxy

COPY index.js package.json package-lock.json ./

RUN npm ci

FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /unleash-proxy

COPY --from=builder /unleash-proxy /unleash-proxy

EXPOSE 3000

USER node

CMD node index.js

FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
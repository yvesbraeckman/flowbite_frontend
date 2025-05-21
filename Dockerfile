# Stap 1: Build de Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stap 2: Serve de app met Nginx
FROM nginx:alpine

# Kopieer de build output van Angular naar de Nginx public folder
COPY --from=build /app/dist/flowbite-app/browser /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
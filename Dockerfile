FROM node as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app

RUN npm run build
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Dockerfile for React frontend
# FROM node:18-alpine as build
#
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx:stable-alpine
WORKDIR /opt/app
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
RUN rm /etc/nginx/sites-enabled/default
COPY deploy/docker/nginx.conf /etc/nginx/nginx.conf
COPY deploy/docker/cacerts /usr/lib/jvm/java-11-openjdk-amd64/lib/security/
COPY ssl/531d9484512856a3.pem /opt/app/
COPY ssl/generated-private-key.key /opt/app/
COPY frontend/build /opt/app/react
ENV TESTSIGMA_WEB_PORT=${TESTSIGMA_WEB_PORT:-80}
ENV TESTSIGMA_SERVER_PORT=${TESTSIGMA_SERVER_PORT:-9090}
EXPOSE $TESTSIGMA_WEB_PORT
EXPOSE $TESTSIGMA_SERVER_PORT
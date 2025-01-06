FROM node:18-alpine AS build

WORKDIR /app
# Update and install necessary packages
RUN apk update && apk add --no-cache \
    wget \
    gnupg \
    curl \
    nginx


RUN groupadd -r nginx && useradd -r -g nginx nginx
RUN mkdir /etc/nginx/logs

COPY ./build /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY scripts/entrypoint.sh /app/entrypoint.sh
COPY ssl/531d9484512856a3.pem /app/
COPY ssl/generated-private-key.key /app/

RUN chmod +x /app/entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]

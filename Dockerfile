FROM node:18-alpine AS build

WORKDIR /app
# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg2 \
    curl \
    nginx
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN groupadd -r nginx && useradd -r -g nginx nginx
RUN mkdir /etc/nginx/logs

COPY package*.json ./

COPY . .

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf
COPY scripts/entrypoint.sh /app/entrypoint.sh
COPY ssl/531d9484512856a3.pem /app/
COPY ssl/generated-private-key.key /app/

EXPOSE 80
ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]

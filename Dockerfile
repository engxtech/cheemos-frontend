FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Update and install necessary packages using apk
RUN apk update && apk add --no-cache \
    wget \
    gnupg \
    curl \
    nginx

# Create necessary directories for Nginx logs
RUN mkdir -p /var/log/nginx /etc/nginx/logs

# Copy the build files
COPY ./build /usr/share/nginx/html

# Remove default Nginx site and copy custom configuration
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script and SSL certificates
COPY scripts/entrypoint.sh /app/entrypoint.sh
COPY ssl/531d9484512856a3.pem /app/
COPY ssl/generated-private-key.key /app/

# Ensure the entrypoint script is executable
RUN chmod +x /app/entrypoint.sh

# Expose port 80
EXPOSE 80

# Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

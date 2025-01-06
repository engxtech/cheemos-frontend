#!/bin/bash

set -x

SSL_DIR="/etc/ssl/"

if [ ! -d "$SSL_DIR" ]; then
  mkdir $SSL_DIR
fi


cp /app/generated-private-key.key /etc/ssl/generated-private-key.key
cp /app/531d9484512856a3.pem /etc/ssl/531d9484512856a3.pem


echo "---------------------- Starting Nginx ----------------------"

/usr/sbin/nginx
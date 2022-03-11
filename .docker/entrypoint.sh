#!/bin/bash

#On error no such file entrypoint.sh, execute in terminal - dos2unix .docker\entrypoint.sh
### FRONT-END
# npm config set cache /var/www/.npm-cache --global
# cd /var/www/frontend && npm install && cd ..

### BACK-END
cd backend
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

composer install

php-fpm
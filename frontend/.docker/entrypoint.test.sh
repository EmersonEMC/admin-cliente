#!/bin/bash

echo ".................................."
echo "TEST:"$TEST

npm install
npm run build
npm run lint

if ! [ -z $TEST ] && [ $TEST == 'unit' ]; then
    npm run test:ci
    npm run test:ci:cov
fi

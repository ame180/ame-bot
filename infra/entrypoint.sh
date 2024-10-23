#!/bin/sh

yarn install
yarn build
yarn migrate

tail -f /dev/null
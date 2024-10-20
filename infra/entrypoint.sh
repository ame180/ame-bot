#!/bin/sh

yarn install
yarn build
yarn sequelize-cli db:migrate

tail -F /dev/null
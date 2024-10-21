#!/bin/sh

yarn install
yarn build
yarn sequelize-cli db:migrate

node dist/index.js
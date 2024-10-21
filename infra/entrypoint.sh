#!/bin/sh

yarn install
yarn build
yarn migrate

yarn start
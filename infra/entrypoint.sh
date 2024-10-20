#!/bin/sh

yarn install
yarn build

tail -F /dev/null
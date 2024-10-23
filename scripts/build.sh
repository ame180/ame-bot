#!/bin/bash

source .env

docker compose -f compose-prod.yml build
docker compose -f compose-prod.yml push
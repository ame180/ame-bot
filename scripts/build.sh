#!/bin/bash

source .env

docker compose -f compose-prod.yml build
docker push ghcr.io/ame180/amebot-node:latest
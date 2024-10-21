#!/bin/bash

source .env
docker login ghcr.io -u ame180 -p $GITHUB_TOKEN
docker compose -f docker-compose-prod.yml build
docker push ghcr.io/ame180/amebot-node:latest
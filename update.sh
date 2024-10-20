#!/bin/bash

# Pull the latest changes from the repository
git reset --hard HEAD
git pull

# Replace docker-compose.yml with the production version
mv docker-compose-prod.yml docker-compose.yml
mv infra/.dockerignore-prod .dockerignore

# Restart the containers
docker compose down
docker compose up -d --force-recreate
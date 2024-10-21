#!/bin/bash

# Stop the containers to avoid unpredictable behavior
docker compose down

# Pull the latest changes from the repository
git reset --hard HEAD
git pull

# Replace docker-compose.yml with the production version
mv docker-compose-prod.yml docker-compose.yml

# Fetch the latest version of the images
source .env
docker login ghcr.io -u ame180 -p $GITHUB_TOKEN
docker compose pull

# Restart the containers
docker compose up -d --build --force-recreate
#!/bin/bash

# Stop the containers to avoid unpredictable behavior
docker compose down

# Pull the latest changes from the repository
git reset --hard HEAD
git pull

# Replace docker-compose.yml with the production version
mv docker-compose-prod.yml docker-compose.yml

# Restart the containers
docker compose up -d --build --force-recreate
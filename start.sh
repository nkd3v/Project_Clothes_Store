#!/bin/bash

# Build and start the Docker containers
docker-compose up -V --build

# Clean up Docker containers and networks when finished
docker-compose down


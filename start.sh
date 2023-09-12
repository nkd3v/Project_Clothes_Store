#!/bin/bash

# Build and start the Docker containers
docker-compose up --build

# Clean up Docker containers and networks when finished
docker-compose down


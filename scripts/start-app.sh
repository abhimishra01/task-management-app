#!/bin/bash

BUILD=$1

if [ "$BUILD" == "build" ]; then
    echo "Rebuilding and starting containers..."
    docker-compose up --build -d
else
    echo "Starting containers without rebuild..."
    docker-compose up -d
fi
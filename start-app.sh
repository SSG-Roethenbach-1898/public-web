#!/usr/bin/env bash

echo "Activate virtual environment"
source ./venv/Scripts/activate

echo "Start FastAPI backend"
fastapi dev --port 9090
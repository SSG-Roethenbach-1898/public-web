#!/usr/bin/env bash

echo "Activate virtual environment"
source ./venv/Scripts/activate

# Upgrade all packages
echo "Upgrade Python packages"
pip --disable-pip-version-check list --outdated --format=json | python -c "import json, sys; print('\n'.join([x['name'] for x in json.load(sys.stdin)]))" | xargs -n1 pip install -U

echo "Start FastAPI backend"
fastapi $1 --port 9090
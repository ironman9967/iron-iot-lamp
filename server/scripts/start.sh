#!/bin/sh

sh ./scripts/gcloud-setup.sh

echo "<<--------------------------------------->>"

node dist/index.js

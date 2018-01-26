#!/bin/sh

source ./scripts/setup-env.local.sh
export IRON_IOT_LAMP_ENV=LOCAL
npm run start-server

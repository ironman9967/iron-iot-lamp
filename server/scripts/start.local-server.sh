#!/bin/sh

source ./scripts/setup-env.local.sh
export IRON_IOT_LAMP_ENV=LOCAL_SERVER
npm run start-server

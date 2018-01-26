#!/bin/sh

echo NODE_ENV: \"$NODE_ENV\"
echo IRON_IOT_LAMP_ENV: \"$IRON_IOT_LAMP_ENV\"

if [[ $NODE_ENV == 'production' ]]
then
	sh ./scripts/gcloud-setup.sh
fi

node dist/index.js

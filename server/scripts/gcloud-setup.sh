#!/bin/sh

tar -xzf google-cloud-sdk.tar.gz

rm -rf google-cloud-sdk.tar.gz

apt-get update

./google-cloud-sdk/install.sh -q

gcloud -q components install beta

gcloud -q --version

gcloud info --run-diagnostics -q

gcloud auth activate-service-account \
	${GCP_SRV_ACCT} \
	-q \
	--key-file=${GCP_SRV_ACCT_KEY_FILE}

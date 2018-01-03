
tar -xvzf google-cloud-sdk.tar.gz

rm -rf google-cloud-sdk.tar.gz

apt-get update

./google-cloud-sdk/install.sh

gcloud components install beta

gcloud --version

gcloud info --run-diagnostics

gcloud auth activate-service-account \
	${GCP_SRV_ACCT} \
	--key-file=./${GCP_SRV_ACCT_KEY_FILE}

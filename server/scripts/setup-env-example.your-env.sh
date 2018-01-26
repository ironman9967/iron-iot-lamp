#!/bin/sh

export PORT=8080

export GCP_PROJECT=my-gcp-project
export GCP_REGION=us-central1
export GCP_OAUTH_SECRET=my-oauth-secret
export GCP_IOT_REGISTRY=my-gcp-iot-core-registry
export GCP_SRV_ACCT=my-gcp-service-account-email@my-gcp-project.iam.gserviceaccount.com
export GCP_SRV_ACCT_KEY_FILE=./my-gcp-service-account-password-file-JSON-FILE-ONLY!.json

export REACT_APP_GCP_OAUTH_CLIENT_ID=my-gcp-oauth-client-id.apps.googleusercontent.com

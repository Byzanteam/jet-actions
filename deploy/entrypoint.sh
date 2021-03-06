#!/bin/sh -l
set -eux

# Set deploy key
JET_DEPLOY_KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $JET_DEPLOY_KEY_PATH
sed -i 's/\\n/\n/g' $JET_DEPLOY_KEY_PATH
chmod 600 $JET_DEPLOY_KEY_PATH

# Deploy
echo "🚧 Start to deploy"

ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $JET_DEPLOY_KEY_PATH -o StrictHostKeyChecking=no -T "cd $INPUT_DEPLOY_TO/jet/current && make update"

echo "🚀 Successfully deployed!"

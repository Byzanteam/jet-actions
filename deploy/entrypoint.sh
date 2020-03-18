#!/bin/sh -l
set -eux

# Set deploy key
SSH_PATH=$HOME/.ssh
mkdir -p $SSH_PATH
echo $DEPLOY_KEY > $SSH_PATH/id_rsa
chmod 600 $SSH_PATH/id_rsa

# Deploy
echo "🚧 Start to deploy"

echo "cd $DEPLOY_TO/jet/current && make update" | ssh $DEPLOY_USER@$DEPLOY_HOST -p $DEPLOY_PORT -o StrictHostKeyChecking=no -T

echo "🚀 Successfully deployed!"

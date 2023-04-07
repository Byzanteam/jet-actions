#!/bin/sh -l
set -eux

# Set deploy key
UPGRADE_KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $UPGRADE_KEY_PATH
sed -i 's/\\n/\n/g' $UPGRADE_KEY_PATH
chmod 600 $UPGRAGE_KEY_PATH

# Deploy
echo "🚧 Start to upgrade"

ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $UPGRADE_KEY_PATH -o StrictHostKeyChecking=no -T \
	'image=$(docker ps --format "{{.Image}}" |\
	grep $INPUT_IMAGE_NAME:$INPUT_IMAGE_VERSION |\
	awk -F/ "{print \$NF}") &&\
	sed "s/$image/$INPUT_IMAGE_NAME:$INPUT_IMAGE_VERSION/" $INPUT_DEPLOY_TO/docker-compose.yml'

ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $UPGRADE_KEY_PATH -o StrictHostKeyChecking=no -T \
	"cd $INPUT_DEPLOY_TO && docker-compose up -d"

echo "🚀 Successfully deployed!"

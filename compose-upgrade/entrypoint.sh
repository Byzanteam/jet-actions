#!/bin/sh -l
set -eux

# Set deploy key
UPGRADE_KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $UPGRADE_KEY_PATH
sed -i 's/\\n/\n/g' $UPGRADE_KEY_PATH
chmod 600 $UPGRADE_KEY_PATH

# Deploy
echo "🚧 Start to upgrade"

# Gets the tag of the current image
image=$(ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $UPGRADE_KEY_PATH -o StrictHostKeyChecking=no -T \
	"docker ps --format '{{.Image}}' | grep $INPUT_IMAGE_NAME | awk -F/ '{print \$NF}'")

# Replace the image in the docker-compose file
ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $UPGRADE_KEY_PATH -o StrictHostKeyChecking=no -T \
	"sed -i \"s/$image/$INPUT_IMAGE_NAME:$INPUT_IMAGE_VERSION/\" $INPUT_DEPLOY_TO/docker-compose.yml"

# Upgrade image
ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST -p $INPUT_DEPLOY_PORT -i $UPGRADE_KEY_PATH -o StrictHostKeyChecking=no -T \
	"cd $INPUT_DEPLOY_TO && docker-compose up -d"

echo "🚀 Successfully deployed!"

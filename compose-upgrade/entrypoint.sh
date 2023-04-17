#!/bin/sh -l
set -eux

echo "::group::🔑 Set deploy key"
KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $KEY_PATH
sed -i 's/\\n/\n/g' $KEY_PATH
chmod 600 $KEY_PATH

echo "::endgroup::"

echo "::group::🚧 The $INPUT_SERVICE_NAME service is undergoing an upgrade on $INPUT_HOST"
# Backup remote host docker-compose file
ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -T \
	"cp $INPUT_DOCKER_COMPOSE_FILE_PATH $INPUT_DOCKER_COMPOSE_FILE_PATH.`date +%Y%m%d%H%M`.bak"

# Modify the remote host docker-compose file
ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -T \
	"cat $INPUT_DOCKER_COMPOSE_FILE_PATH" | \
        yq ".services.$INPUT_SERVICE_NAME.image=\"$INPUT_IMAGE\"" | \
        ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -T \
		"tee $INPUT_DOCKER_COMPOSE_FILE_PATH"

# Upgrade application
ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -T \
	"docker-compose -f $INPUT_DOCKER_COMPOSE_FILE_PATH up -d"

echo "::endgroup::"

echo "::group::🚀 The $INPUT_SERVICE_NAME service has been upgraded on $INPUT_HOST successfully!"
echo "::endgroup::"

#!/bin/sh -l
set -eou pipefail

echo "::group::🔑 Set deploy key"
KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $KEY_PATH
sed -i 's/\\n/\n/g' $KEY_PATH
chmod 600 $KEY_PATH

echo "::endgroup::"

echo "::group::🚧 The $INPUT_SERVICE_NAME service is undergoing an upgrade on $INPUT_HOST"
# Backup remote host docker-compose file
echo "############### Backup remote host docker-compose file. ###############"
ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -Tq \
	"sudo cp $INPUT_DOCKER_COMPOSE_FILE_PATH $INPUT_DOCKER_COMPOSE_FILE_PATH.`date +%Y%m%d%H%M`.bak"

# Modify the remote host docker-compose file
echo "############### Backup successful. Modify the remote host docker-compose file. ###############"
# Read the docker compose file contents
docker_compose_contents=$(ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -Tq "sudo cat $INPUT_DOCKER_COMPOSE_FILE_PATH")

# Check whether the result is empty. If no, exit the execution.
if [ -z "$docker_compose_contents" ]; then
  echo "############### Docker Compose file is empty. Exiting... ###############"
  exit 1
fi

# Modify the docker compose file contents.
modified_contents=$(echo "$docker_compose_contents" | yq ".services.$INPUT_SERVICE_NAME.image=\"$INPUT_IMAGE\"")

# The modified content is written back to the remote host's docker compose file.
echo "$modified_contents" | ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -Tq " sudo tee $INPUT_DOCKER_COMPOSE_FILE_PATH"

# Upgrade application
echo "############### Modify successful. Upgrade application. ###############"
ssh $INPUT_USER@$INPUT_HOST -p $INPUT_PORT -i $KEY_PATH -o StrictHostKeyChecking=no -Tq \
	"sudo docker-compose -f $INPUT_DOCKER_COMPOSE_FILE_PATH up -d"

echo "::endgroup::"

echo "::group::🚀 The $INPUT_SERVICE_NAME service has been upgraded on $INPUT_HOST successfully!"
echo "::endgroup::"

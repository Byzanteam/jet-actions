#!/bin/sh -l
set -eux

# Set deploy key
JET_DEPLOY_KEY_PATH=/tmp/deploy_key
echo "$INPUT_PRIVATE_KEY" > $JET_DEPLOY_KEY_PATH
sed -i 's/\\n/\n/g' $JET_DEPLOY_KEY_PATH
chmod 600 $JET_DEPLOY_KEY_PATH

# Deploy
echo "🚧 Start to deploy"

ssh $INPUT_DEPLOY_USER@$INPUT_DEPLOY_HOST \
  -p $INPUT_DEPLOY_PORT \
  -i $JET_DEPLOY_KEY_PATH \
  -o StrictHostKeyChecking=no \
  -T "kubectl --namespace=${INPUT_NAMESPACE} set image ${INPUT_RESOURCE} ${INPUT_CONTAINER}=${INPUT_REGISTRY}/${INPUT_IMAGE}:${INPUT_TAG}"

# kubectl set image $resource $container=$registry/$image:$tag
# kubectl set image deployments/workflow-jet-chart-airbase jet-chart-airbase=registry.ap-northeast-1.aliyuncs.com/jet/airbase_umbrella:alpha

echo "🚀 Successfully deployed!"

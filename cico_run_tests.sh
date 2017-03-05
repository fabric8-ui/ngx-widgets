#!/bin/bash

# Show command before executing
set -x

# Exit on error
set -e

# We need to disable selinux for now, XXX
/usr/sbin/setenforce 0

# Get all the deps in
yum -y install \
  docker \
  make \
  git
service docker start

# Build builder image
docker build -t fabric8-ui-builder -f Dockerfile.builder .
mkdir -p dist && docker run --detach=true --name=fabric8-ui-builder -e "API_URL=http://demo.api.almighty.io/api/" -e "CI=true" -t -v $(pwd)/dist:/dist:Z fabric8-ui-builder

# Build almighty-ui
docker exec fabric8-ui-builder npm install

set +e

## Exec unit tests
docker exec fabric8-ui-builder ./run_unit_tests.sh

if [ $? -eq 0 ]; then
  echo 'CICO: unit tests OK'
else
  echo 'CICO: unit tests FAIL'
  exit 1
fi

## Exec functional tests
docker exec fabric8-ui-builder ./run_functional_tests.sh

if [ $? -eq 0 ]; then
  echo 'CICO: functional tests OK'
else
  echo 'CICO: functional tests FAIL'
  exit 1
fi

## Exec build
docker exec fabric8-ui-builder npm run build

if [ $? -eq 0 ]; then
  echo 'CICO: distribution build OK'
else
  echo 'CICO: distribution build FAIL'
  exit 1
fi


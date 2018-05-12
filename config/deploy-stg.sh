#!/bin/bash
yarn build:stg
rm -rf node_modules yarn.lock
NODE_ENV=production yarn install

echo "== build succeeded (double check) =="
if [ ! -d "$TRAVIS_BUILD_DIR/dist" ]; then
    exit 1
fi

echo "== compress (tar) =="
cd $TRAVIS_BUILD_DIR
tar -czf ../build.tar.gz .

echo "== deploy (rsync) =="
rsync -ar --stats ../build.tar.gz user@$STG_HOSTNAME:/tmp/build.tar.gz
# rsync -ar --stats --delete-after $TRAVIS_BUILD_DIR/ user@$STG_HOSTNAME:/tmp/build

echo "== extract (ssh/tar) =="
ssh user@$STG_HOSTNAME 'rm -rf /tmp/build'
ssh user@$STG_HOSTNAME 'mkdir /tmp/build'
ssh user@$STG_HOSTNAME 'tar -xzf /tmp/build.tar.gz -C /tmp/build'

echo "== pm2 stop (ssh/pm2) =="
ssh user@$STG_HOSTNAME 'pm2 delete all'

echo "== move build (ssh/move) =="
ssh user@$STG_HOSTNAME 'rm -rf ~/build.old'
ssh user@$STG_HOSTNAME 'mv ~/build ~/build.old'
ssh user@$STG_HOSTNAME 'mv /tmp/build ~/build'

echo "== setup database =="
ssh user@$STG_HOSTNAME 'cd build; yarn setup:stg'

echo "== pm2 start (ssh/pm2) =="
ssh user@$STG_HOSTNAME 'cd ~/build; redis-cli flushall; pm2 update; yarn serve:stg'

#!/bin/bash

# Set trap to kill all processes at exit
trap "echo Exiting...; kill -TERM -1; exit" SIGINT SIGTERM

# Add a local user
# Either use the LOCAL_USER_ID if passed in at runtime or
# fallback
#USER_ID=${LOCAL_USER_ID:-9001}
#echo "Starting with UID : $USER_ID"
#addgroup -g $USER_ID user && adduser -D -G user -s /bin/bash -u $USER_ID user
#
#su - user
#
#id
#env
#
#export HOME=/home/user
#mkdir -p ${HOME}/.nvm
#
#echo 'eval "$(rbenv init -)"' >> ${HOME}/.bashrc

# Install nvm to use specific version of node.
export NODE_VERSION=8.0.0
export NPM_VERSION=6.1.0

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

export NVM_DIR=$HOME/.nvm
source $NVM_DIR/nvm.sh

nvm install $NODE_VERSION
nvm use --delete-prefix v$NODE_VERSION


bundle install

# Install specific version of npm
npm install npm@${NPM_VERSION} -g

# Install project dependencies
npm install

# Run audit to project dependencies
npm audit

# Start the app.
npm run dev &

# Wait for user to press CTRL-C
while true
do
 sleep 1
done
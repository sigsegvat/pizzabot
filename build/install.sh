#!/bin/bash

./nvm.sh
export NVM_DIR="/Users/mat/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 6.9
#!/bin/bash

#Give permission for everything in the school-erp directory
sudo chmod -R 777 /home/ubuntu/school-erp

#Navigate into our working directory where we have all our github files
cd /home/ubuntu/school-erp

#Add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#Install node modules
echo "Installing dependencies..."
npm install

#Test our codes
echo "Running our test codes..."
npm run test

#Start our node app in the background
echo "Starting our server..."
node app.js > app.out.log 2> app.err.log < /dev/null &  
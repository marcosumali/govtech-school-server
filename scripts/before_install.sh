#!/bin/bash

#Download NodeJS and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#Check node version
echo "Checking node version..."
node -v

#Install pm2
echo "Installing pm2..."
sudo i -g pm2

#Create our working directory if it doesnt exist
DIR="/home/ubuntu/school-erp"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi
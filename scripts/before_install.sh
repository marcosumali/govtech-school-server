#!/bin/bash

#Download NodeJS
echo "Download NodeJS v16.x..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

#Install NodeJS
echo "Installing NodeJS v16.x..."
sudo apt-get install -y nodejs

#Check node version
echo "Checking node version..."
node -v

#Install pm2
echo "Installing pm2..."
sudo i -g pm2

#Create our working directory if it doesnt exist
DIR="/home/ec2-user/school-erp"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi
#!/bin/bash
set -x

sudo apt-get update
sudo apt install nodejs npm
# Navigate to the Node.js backend directory
cd ../backend_battery

# Start the Node.js backend server
sudo npm install
# npm start &
# Open a new terminal window and navigate to the React frontend directory
# gnome-terminal --working-directory=/client -e "npm start"

cd ../backend_battery/client

# Start the React frontend server
sudo npm install
sudo npm run build
# npm start
# npm install -g http-server
sudo apt install nginx

sudo npm i -g pm2

sudo chmod +x start_servers_Linux.sh

echo "All installed"
# cd ../client/build
# http-server -p 8080
# start cmd /k cd /d /client && npm start

read -p "Press Enter to exit"

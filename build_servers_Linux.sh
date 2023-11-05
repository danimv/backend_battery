#!/bin/bash
set -x

cd ../backend_battery

# Start the Node.js backend server
sudo npm install

cd ../backend_battery/client

# Start the React frontend server
sudo npm install
sudo npm run build

read -p "Press Enter to exit"

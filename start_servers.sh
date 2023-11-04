#!/bin/bash

# Navigate to the Node.js backend directory
cd ../backend_battery

# Start the Node.js backend server
npm install
npm start &

# Open a new terminal window and navigate to the React frontend directory
# gnome-terminal --working-directory=/client -e "npm start"
cd ../backend_battery/client

# Start the React frontend server
npm install
npm run build
npm start
# start cmd /k cd /d /client && npm start

read -p "Press Enter to exit"

#!/bin/bash
set -x

# ports=(3000 5200)

# # Loop through the list of ports and attempt to terminate any processes
# for port in "${ports[@]}"
# do
#     echo "Resetting port $port..."
#     pid=$(lsof -t -i:$port)
#     if [ -n "$pid" ]; then
#         kill $pid
#         echo "Process on port $port terminated."
#     else
#         echo "No process found on port $port."
#     fi
# done

# echo "Port reset complete."
# Define the range of ports to check
start_port=5000
end_port=7000

# Find an available port
for ((port=start_port; port<=end_port; port++)); do
    (echo >/dev/tcp/localhost/$port) >/dev/null 2>&1 || break
done

# Navigate to the Node.js backend directory
cd ../backend_battery

# Start the Node.js backend server
npm start &
echo "Nodejs started"
cd ../backend_battery/client

# Open a new terminal window and navigate to the React frontend directory
# gnome-terminal --working-directory=/client -e "npm start"
# cd ../backend_battery/client

# Start the React frontend server
# npm start
# npm install -g http-server
# http-server -p $port -c-1 client/build #-a index.html
serve -s build
echo "HTTP server started on localhost"
# start cmd /k cd /d /client && npm start

read -p "Press Enter to exit"

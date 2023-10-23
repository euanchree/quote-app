#!/bin/bash
# Euan Chree 1912490
echo "Setting up website environment ..."

# Install programs (Ubuntu 20.04 vm)
echo "Installing node ..."
# Node
if ! command -v node &> /dev/null
then
    echo "Couldn't find node, installing"
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt install -y nodejs
fi

# Mongodb
echo "Installing mongodb ..."
if ! command -v mongod &> /dev/null
then
    echo "Couldn't find mongo, installing."
    ## Importing the public key
    sudo apt install -y gnupg
    sudo wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    ## Adding repo
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    ## Updating apt
    sudo apt update
    ## Installing mogno
    sudo apt install -y mongodb-org
fi


# Cloning github repo
echo "Cloning repo ..."
git clone git@github.com:euan-prog/cm4025-coursework.git

# Creating folder for the database
echo "Creating and starting database ..."
mkdir Database
# Starting mongo
mongod --dbpath Database &

# Start Node server
cd cm4025-coursework

# Installing node packages
npm install

# Starting backend
node backend/index.js &

# Starting frontend
HTTPS=true npm start &
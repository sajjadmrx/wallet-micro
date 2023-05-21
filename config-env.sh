#!/bin/bash
red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)
space() {
    for ((i = 1; i <= $1; i++)); do
        echo
    done
}

echo "                        Wallet-micro with NestJs            "
space 5
echo "config .env file"
space 2
echo "Config Database's"
space 2
read -p "Enter MySQL database name: " MYSQL_DATABASE
read -p "Enter MySQL user: " MYSQL_USER
read -p "Enter MySQL password: " MYSQL_PASSWORD
read -p "Enter MySqL port(press Enter for default 3306):" MYSQL_PORT
MYSQL_PORT=${MYSQL_PORT:-3306}
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 32)
echo "generated Random password for root"
space 3
read -p "Enter port number (press Enter for default 3000): " PORT
PORT=${PORT:-3000}
read -p "Enter app mode[development,production] (press Enter for development): " APP_MODE
APP_MODE=${APP_MODE:-DEVELOPMENT}

echo "DATABASE_URL=mysql://$MYSQL_USER:$MYSQL_PASSWORD@mysqldb:$MYSQL_PORT/$MYSQL_DATABASE" >>.env
echo "PORT=$PORT" >>.env
echo "APP_MODE=$APP_MODE" >>.env
echo "MYSQL_USER=$MYSQL_USER" >>.env
echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" >>.env
echo "MYSQL_DATABASE=$MYSQL_DATABASE" >>.env
echo "MYSQL_PORT=$MYSQL_PORT" >>.env
echo "MYSQL_ROOT_PASSWORD=$(openssl rand -hex 12)" >>.env
echo "JWT_SECRET=$(openssl rand -hex 12)" >>.env
echo "${green}Values saved to .env file${reset}"
space 3

read -p "Do you want to run '${green}docker-compose  --profile product up -d${reset}' automatically? [y/n]: " REPLY

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Automatically run `docker-compose up -d`
    docker-compose --profile product up -d
else
    # Prompt the user to run `docker-compose up -d` manually
    echo "Run 'docker-compose  --profile product up -d' manually to start the application. ${red}[Exiting...]${reset}"
    sleep 3
fi

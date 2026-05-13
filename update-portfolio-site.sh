#!/bin/bash
cd /client-sites/GriffinManagedWebSolutions || {
        echo "Unable to change directories."
        exit 1
}

sudo git pull origin master || {
        echo "Unable to pull latest update."
        exit 1
}

sudo docker-compose down || {
        echo "Unable to stop personal site container."
        exit 1
}

cd /client-sites/GriffinManagedWebSolutions/frontend || {
        echo "Unable to change directories."
        exit 1
}

npm run build || {
        echo "Build attempt failed."
        exit 1
}

rm -rf /client-sites/GriffinManagedWebSolutions/backend/build || {
        echo "Unable to delete build folder."
        exit 1
}

mv build /client-sites/GriffinManagedWebSolutions/backend || {
        echo "Unable to overwrite build folder."
        exit 1
}

cd /client-sites/GriffinManagedWebSolutions || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose up --build -d || {
        echo "Unable to build and start griffin managed web solutions container."
        exit 1
}

echo "The griffin managed web solutions was rebuilt. The Docker container was started and is successfully serving the web agency site!"
exit%       

#!/bin/bash
cd /portfolio/PersonalSite || {
        echo "Unable to change directories."
        exit 1
}

sudo git pull origin main || {
        echo "Unable to pull latest update."
        exit 1
}

sudo docker-compose down || {
        echo "Unable to stop personal site container."
        exit 1
}

cd /portfolio/PersonalSite/portfoliosite || {
        echo "Unable to change directories."
        exit 1
}

npm run build || {
        echo "Build attempt failed."
        exit 1
}

rm -rf /portfolio/PersonalSite/backend/build || {
        echo "Unable to delete build folder."
        exit 1
}

mv build /portfolio/PersonalSite/backend || {
        echo "Unable to overwrite build folder."
        exit 1
}

cd /portfolio/PersonalSite || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose up --build -d || {
        echo "Unable to build and start personal site container."
        exit 1
}

echo "The personal site frontend was rebuilt. The Docker container was started and is successfully serving the personal site!"
exit%       
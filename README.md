# # SquadLight-Node

This is the backend part of our Northcoders final group project and uses Socket.io and MongoDb.
Socket.io is used to create websocket connections between multiple users allowing the frontend to send and receive messages, gps coordinates and alerts.
MongoDb stores the users unique socketID, the username that they wish to use and the room/squad they are joining. We do not store any chat history or location data in the interest of user security.

The repo for the frontend can be found here:\
[GitHub - Root-2/SquadLight-Flutter: Flutter repo for SquadLight group project.](https://github.com/Root-2/SquadLight-Flutter)

This app was created by the following:\
[Sam Ashurst · GitHub](https://github.com/SamAshurst),\
[Dan Routledge · GitHub](https://github.com/Root-2),\
[Matt Jones · GitHub](https://github.com/mjonesdev),\
[Kieron Day · GitHub](https://github.com/kieron-day),\
[Zsolt Kallai · GitHub](https://github.com/kllzslt),

### Node
The minimum required version of Node to run this app locally is: v17.5.0

### Run This App Locally
Clone the repository through the command line with git clone `https://github.com/SamAshurst/SquadLight-Node.git`\
Install the dependencies through the command line with `npm install`
Run the app with `npm start`

### Database Setup
This repo was built around a MongoDB Atlas database and as such was designed to run with a remote database. In order to run this repo you will need to sign up for a free MongoDB Atlas database at https://www.mongodb.com/atlas/database.
Once this has been done, update the database/db.js with IP and Port that MongoDB will use and then create two .env files `.env.development` and `.env.test`, inside these add `MONGO_DB = squadLightDb` and `MONGO_DB = squadLightDb_test` respectfully.

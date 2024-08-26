# NodemailerApp
Email sender application with Node Js, Express and MongoDb. GET request to get all email sendings and POST request to send an email.
You can configure your mongodb atlas account information with creating .env file. The keys required for application are shown in .env.example file.
You can use this command copy and create .env file:
>> cp .env.example .env

Dependencies used in the application:

"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongodb": "^6.8.0",
    "mongoose": "^8.5.3",
    "nodemailer": "^6.9.14",
    "nodemon": "^3.1.4",
    "winston": "^3.14.2"
  }

  Used Winston for logging user requests.
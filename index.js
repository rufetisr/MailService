// packages
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
require('dotenv').config();
// my files
const Email = require('./model/Email');
const logger = require('./logger');
const requestLogger = require('./middleware/loggerMiddleware');


const app = express();

const PORT = 3002;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);


let db_username = process.env.DB_USERNAME;
let db_password = process.env.DB_PASSWORD;
let cluster_name = process.env.CLUSTER_NAME;


app.listen(PORT, () => {
    console.log('server is running on port: ', PORT);
})

function sendMail(from, emailPass, to, sub, mesg, res) {

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,

            auth: {
                user: from,
                pass: emailPass,
            }
        }
    )

    transporter.sendMail({
        from: from,
        to: to,
        subject: sub,
        html: mesg,
    }, async (err, info) => {
        if (err) {
            try {
                throw res.status(500).send(err.message);
            } catch (error) {
                logger.error(err.message);
            }
        }
        else {
            logger.info(`Email sent successfully`);

            res.status(200).send(info.response);

            const email = new Email({
                from: from,
                to: to,
                subject: sub,
                message: mesg,
            });

            await email.save();
        }
    })
}

app.post('/send-email', (req, res) => {

    const { from, emailPass, to, subject, message } = req.body;

    try {
        sendMail(from, emailPass, to, subject, message, res)

    } catch (error) {
        console.log('catch block');
    }

})

app.get('/all-emails', async (req, res) => {

    let allEmails = await Email.find();

    res.status(200).send(allEmails);
})

mongoose.connect(`mongodb+srv://${db_username}:${db_password}@${cluster_name}.zl4xy.mongodb.net/?retryWrites=true&w=majority&appName=${cluster_name}`)
    .then(() => {
        logger.info('Connected to MongoDb');
    })
    .catch((err) => {
        logger.error('Connection failed to MongoDb: ', err.message);
    });



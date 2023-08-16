// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');

// Mailgun configuration
const api_key = '9536154ed907fb3c0757a70ae9dc833d-ee16bf1a-1678ffc0';
const domain = 'sandboxfbeb1ad3729e4278884420fb9a41dd99.mailgun.org';
const mail = mailgun({ apiKey: api_key, domain: domain });

// Create an Express application
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/subscribe', (req, res) => {
    const userEmail = req.body.Email;

    const emailContent = {
        from: 'Aditya <adityabharti528@gmail.com>',
        to: userEmail,
        subject: "Welcome to maler",
        text: "welcom to our brand new softare you will be reciving regular emails regarding our latest launches."
    };

    mail.messages().send(emailContent, (error, body) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send email');
        }

        console.log(body);
        res.sendFile(path.join(__dirname, 'index.html'));
    });
});

// Start the server
app.listen(7200, () => {
    console.log("Server is running at port 7200")
})
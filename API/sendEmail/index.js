require('dotenv').config()

const sgMail = require('@sendgrid/mail');

module.exports = {
    send : (req, res) => {
        const {to} = req.body

        const msg = {
            to,
            from: 'gimeAlkemy@hotmail.com',
            subject : 'Welcome to ApiHeroes',
            text : 'I am very happy that you have joined to my ApiKey. Hope you liked it!',
        }

        if(msg){
            res.status(201).json({success : true})
        }

        try {
            /* process.env.SENDGRID.send(msg) */
            sgMail.setApiKey(process.env.SENDGRID)
            sgMail.send(msg)
        } catch (error) {
            res.status(500).json('We are having some problems. Try again later.')
        }
    }
}
require('dotenv').config()
const db = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login : (req, res) => {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).json({
                auth : false,
                msg : 'missing data'
            })
        }

        db.User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(password.trim(), user.password)){
                return res.status(404).json({
                    auth : false,
                    msg : 'Invalid data'
                })
            }
            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn : 60 * 10
                }
            )

            return res.status(200).json({
                auth : true,
                msg : 'Successful login',
                token
            })
        })
        .catch(err => res.status(500).json(err))
    },
    register : (req, res) => {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).json({
                auth : false,
                msg : 'missing data'
            })
        }

        db.User.create({
            email,
            password : bcrypt.hashSync(password.trim(), 12)
        })
        .then(user => {
            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn : 60 * 10
                }
            )
            
            return res.status(200).json({
                auth : true,
                msg : 'Successfull registration',
                token
            })
        })
        .catch(err => res.status(500).json(err))
    }
}
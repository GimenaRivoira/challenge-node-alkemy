const db = require('../database/models');
const {Op} = require('sequelize');

const getUrl = (req) => req.protocol + '://' + req.get('host') + '/movies'

module.exports = {
    getAll : (req,res) => {
        db.Movies.findAll({
            attributes : ['title', 'release_date', 'image',]
        })
        .then(element => {
            let response = {
                meta : {
                    status : 200,
                    length : element.length,
                    endpoint : getUrl(req)
                },
                data : element
            }
            res.status(200).json(response)
        })
        .catch(err => console.log(err))
    },
    getOne : (req, res) => {
        db.Movies.findOne({
            where: {
                id : req.params.id
            }
        }, 
        {
            include : [
                {
                    association : 'characters'
                }
            ]
        })
        .then(element => {
            if(element){
                let response = {
                    meta : {
                        status : 200,
                        endpoint :getUrl(req) + `/${req.params.id}`
                    },
                    data : {
                        movie : element
                    }
                }
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    status: 404,
                    msg : 'No movie yet'
                })
            } 
        })
    },
    create : (req, res) => {
        const {title, release_date, score, image} = req.body

        db.Movies.create({
            title,
            release_date,
            score,
            image,
        })
        .then(element => {
            if(element){
               let response = {
                   meta : {
                    status : 200,
                    msg : `the movie ${element.title} was added successfully`,
                    endpoint :getUrl(req) + '/' + element.id
                }
            }
            res.status(200).json(response)
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'Movies.score has to be lower than 6'
                })
            }
        })
         .catch(error => {
            console.log(error)
            switch (error.title) {
                case "SequelizeValidationError":
                    let erroresMsg = [];
                    let erroresNotNull = [];
                    let erroresValidation = [];
                    error.errors.forEach(error => {
                        erroresMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            erroresNotNull.push(error.message)
                        } 
                        if (error.type == "Validation error") {
                            erroresValidation.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        messages: "missing data",
                        errores: {
                            length: erroresMsg.length,
                            msg: erroresMsg,
                            notNull: erroresNotNull,
                            validation: erroresValidation
                        }
                    }
                    return res.status(400).json(response)
                    default:
                        return res.status(500).json({error})
                }
        });
    },
    edit : (req, res) => {
        const {title, release_date, score, image} = req.body

        db.Movies.update({
            title,
            release_date,
            score,
            image
        }, 
        {
            where : {
                id : req.params.id
            }
        })
        .then(element => {
            if(element[0]){
                let response = {
                    status : 200,
                    msg : 'the movie was edited'
                }
               res.status(200).json(response)
            } else { 
                res.status(400).json({
                    status : 400,
                    msg : 'ID not found'
                })
            }
        })
        .catch(error => {
            console.log(error)
            switch (error.name) {
                case "SequelizeValidationError":
                    let erroresMsg = [];
                    let erroresNotNull = [];
                    let erroresValidation = [];
                    error.errors.forEach(error => {
                        erroresMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            erroresNotNull.push(error.message)
                        }
                        if (error.type == "Validation error") {
                            erroresValidation.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        messages: "missing data",
                        errores: {
                            length: erroresMsg.length,
                            msg: erroresMsg,
                            notNull: erroresNotNull,
                            validation: erroresValidation
                        }
                    }
                    return res.status(400).json(response)
                    default:
                    return res.status(500).json({error})
                }
        });
    },
    remove : (req, res) => {
        db.Movies.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response){
                res.status(200).json({
                    status : 200,
                    msg : 'The movie was successfully removed'
                })
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'Movie not found'
                })
            }
        })
    }
}
const { Sequelize } = require('../database/models');
const db = require('../database/models');
const {Op} = require('sequelize');

const getUrl = (req) => req.protocol + '://' + req.get('host') + '/characters'

module.exports = {
    getAll : (req, res) => {
        db.Character.findAll({
            attributes : ['name', 'image']
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
         /* if(req.params.id % 1 !== 0){
            res.status(400).json({
                status: 400,
                msg : 'Incorrect ID'
            })
        }  */

        db.Character.findOne({
            where: {
                id : req.params.id
            }
        }, 
        {
            include : [
                {
                    association : 'movies'
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
                        character : element
                    }
                }
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    status: 404,
                    msg : 'No character yet'
                })
            } 
        })
    },
    create : (req, res) => {
        const {name, age, weight, history, image} = req.body

        db.Character.create({
            name,
            age : +age,
            weight : +weight,
            history,
            image
        })
        .then(element => {
            if(element){
               let response = {
                   meta : {
                    status : 200,
                    msg : `the character ${element.name} was added successfully`,
                    endpoint :getUrl(req) + '/' + element.id
                }
            }
            res.status(200).json(response)
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
    edit : (req, res) => {
        const {name, age, weight, history, image} = req.body

        db.Character.update({
            name,
            age : +age,
            weight : +weight,
            history,
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
                    msg : `the character ${element.name} was edited`,
                    endpoint : getUrl(req) + '/' + element.id
                }
               res.status(200).json(response)
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'The character could not be found'
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    remove : (req, res)=> {
        db.Character.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response){
                res.status(200).json({
                    status : 200,
                    msg : 'The character was successfully removed'
                })
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'Character not found'
                })
            }
        })
    },
    search: (req, res) => {
        search = req.query.search

        db.Character.findAll({
            where : {
                name : { [Op.like]: `%${req.query.search}%` }
            }
        })
        .then(response => {
            if(response){
                let result = {
                    meta : {
                        status : 200,
                        lenght : response.length
                    },
                    data : {
                        response
                    }
                }
                res.send(result)
            }
        })
        .catch(err => console.log(err))
    }
}
module.exports = (sequelize, dataTypes) => {

    const alias = "User"

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        email : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        password : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    const config = {
        tableName : "users",
        timestamps : false
    }

    const User = sequelize.define(alias, cols, config)
 
    return User
}
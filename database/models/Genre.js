
module.exports = (sequelize, dataTypes) => {

    const alias = "Genre"

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        filmographyId : {
            type : dataTypes.INTEGER
        }
    }

    const config = {
        tableName : "genres",
        timestamps : false
    }

    const Genre = sequelize.define(alias, cols, config)
     Genre.associate = function(models){
        Genre.hasMany(models.Movies, {
            as : 'genre',
            foreignKey : 'moviesId'
        })
    } 
 
    return Genre
}
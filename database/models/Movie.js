
module.exports = (sequelize, dataTypes) => {

    const alias = "Movies"

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        title : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        score : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    const config = {
        tableName : "movies",
        timeStamps : false
    }

    const Movie = sequelize.define(alias, cols, config)

     Movie.associate = function(models){
        Movie.belongsToMany(models.Character, {
            as : 'movies',
            through : 'movies_characters',
            foreignKey : 'moviesId',
            otherKey : 'characterId'
        })

        Movie.belongsTo(models.Genre, {
            as : 'moviesgenre',
            foreignKey : 'moviesId'
        })
    } 

    return Movie
}
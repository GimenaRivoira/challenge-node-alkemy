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
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'Movies.title can not be null'
                },
                notEmpty : {
                    msg : 'Movies.title can not be empty'
                }
            }
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'Movies.release_date can not be null'
                },
                notEmpty : {
                    msg : 'Movies.release_date can not be empty'
                },
                isDate: true
            }
        },
        score : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate: {
                isIn: {
                    args: [[1,2,3,4,5]],
                    msg: "Movies.score has to be lower than 6"
                },
                notNull : {
                    msg : 'Movies.score can not be null'
                },
                notEmpty : {
                    msg : 'Movies.score can not be empty'
                },
            }
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    const config = {
        tableName : "movies",
        timestamps : false
    }

    const Movie = sequelize.define(alias, cols, config)

     /* Movie.associate = function(models){
        Movie.belongsToMany(models.Character, {
            as : 'characters',
            through : 'movies_characters',
            foreignKey : 'moviesId',
            otherKey : 'characterId'
        })

        Movie.belongsTo(models.Genre, {
            as : 'moviesgenre',
            foreignKey : 'moviesId'
        })
    }  */

    return Movie
}
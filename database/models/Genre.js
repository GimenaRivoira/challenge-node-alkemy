
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
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'Genre.name can not be null'
                },
                notEmpty : {
                    msg : 'Genre.name can not be empty'
                }
            }
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false,
            validate : {
                is : /(.jpg|.jpeg|.png|.gif)$/i,
                notNull : {
                    msg : 'Genre.image can not be null'
                },
                notEmpty : {
                    msg : 'Genre.image can not be empty'
                }
            }
        },
        moviesId : {
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
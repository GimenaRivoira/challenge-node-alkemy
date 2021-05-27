module.exports = (sequelize, dataTypes) => {

    const alias = 'Character'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull: false,
            validate : {
                notNull : {
                    msg : 'Character.name can not be null'
                },
                notEmpty : {
                    msg : 'Character.name can not be empty'
                }
            }
        },
        age : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                is : /^[0-9]*$/,
                notNull : {
                    msg : 'Character.age can not be null'
                },
                notEmpty : {
                    msg : 'Character.age can not be empty'
                }
            }
        },
        weight : {
            type : dataTypes.DECIMAL,
            allowNull : false,
            validate : {
                is : /^[0-9]{1,2}$/,
                notNull : {
                    msg : 'Character.weight can not be null'
                },
                notEmpty : {
                    msg : 'Character.weight can not be empty'
                }
            }
        },
        history : {
            type : dataTypes.STRING(45),
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'Character.history can not be null'
                },
                notEmpty : {
                    msg : 'Character.history can not be empty'
                }
            }
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false,
            validate : {
                is : /(.jpg|.jpeg|.png|.gif)$/i,
                notNull : {
                    msg : 'Character.image can not be null'
                },
                notEmpty : {
                    msg : 'Character.image can not be empty'
                }
            }
        }
    }

    const config = {
        tableName : "characters",
        timestamps : false
    }
    
    const Character = sequelize.define(alias, cols, config)

     Character.associate = function(models){
        Character.belongsToMany(models.Movies, {
            as : 'movies',
            through : 'movies_characters',
            foreignKey : 'characterId',
            otherKey : 'moviesId'
        })
    } 

    return Character
}
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
            allowNull: false
        },
        age : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        weight : {
            type : dataTypes.DECIMAL,
            allowNull : false
        },
        history : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        image : {
            type : dataTypes.STRING(45),
            allowNull : false
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
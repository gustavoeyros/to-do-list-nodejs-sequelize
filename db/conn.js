const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('nodesequelize', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log("Sequelize conectado!")
}
catch(err){
    console.log(err)
}

module.exports = sequelize
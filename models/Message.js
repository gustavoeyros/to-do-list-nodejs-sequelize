const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Message = db.define('Message', {
    description:{
        type: DataTypes.STRING,
        require: true
    }
})


module.exports = Message
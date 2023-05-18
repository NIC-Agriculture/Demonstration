const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class UsersModel extends Model {}

UsersModel.init({
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LogInDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    IP_Address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'UsersModel',
    tableName: 'users',
    timestamps: false
});


module.exports = UsersModel;
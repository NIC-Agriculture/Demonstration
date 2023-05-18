const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class UsersHobbiesModel extends Model {}

UsersHobbiesModel.init({
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    hobbies: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'UsersHobbiesModel',
    tableName: 'UsersHobbies',
    timestamps: false
});


module.exports = UsersHobbiesModel;
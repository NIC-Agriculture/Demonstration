const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const UsersModel = require('./User.model');

class SchemeMasterModel extends Model {}

SchemeMasterModel.init({
    schemeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    schemeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'SchemeMasterModel',
    tableName: 'SchemeMaster',
    timestamps: false
});

module.exports = SchemeMasterModel;
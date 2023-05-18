const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
class CropVarietyModel extends Model {}

CropVarietyModel.init({
    SubCropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    Variety_Code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Variety_Name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IS_ACTIVE: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    STATUS: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

}, {
    sequelize,
    modelName: 'CropVarietyModel',
    tableName: 'CropVarietyMaster',
    timestamps: false
});

module.exports = CropVarietyModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
class CropMasterModel extends Model {}

CropMasterModel.init({
    CropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    CropName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Season: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'CropMasterModel',
    tableName: 'CropMaster',
    timestamps: false
});

module.exports = CropMasterModel;
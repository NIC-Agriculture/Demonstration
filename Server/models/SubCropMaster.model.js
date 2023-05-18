const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const CropMasterModel = require('./CropMaster.model');

class SubCropMasterModel extends Model {}

SubCropMasterModel.init({
    SubCropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    CropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: CropMasterModel,
            key: 'CropId'
        }
    },
    CropName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CropMasterModel,
            key: 'CropName'
        }
    },
    SubCropName: {
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
    modelName: 'SubCropMasterModel',
    tableName: 'SubCropMaster',
    timestamps: false
});

SubCropMasterModel.belongsTo(CropMasterModel, { foreignKey: 'CropId' });
SubCropMasterModel.belongsTo(CropMasterModel, { foreignKey: 'CropName' });

module.exports = SubCropMasterModel;
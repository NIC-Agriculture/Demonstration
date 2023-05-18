const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class itemCropTechnicalMappingMasterModel extends Model {}

itemCropTechnicalMappingMasterModel.init({
    ItemId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    SubCropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Technical_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    Technical_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'itemCropTechnicalMappingMasterModel',
    tableName: 'item_crop_technicalmapping',
    timestamps: false
});

// itemMasterModel.belongsTo(ComponentMasterModel,{foreignKey:'CompId'});

module.exports = itemCropTechnicalMappingMasterModel;
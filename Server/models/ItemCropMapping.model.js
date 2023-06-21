const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class itemCropMappingModel extends Model {}

itemCropMappingModel.init({
    ItemId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    CropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    SubCropId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'itemCropMappingModel',
    tableName: 'item_crop_mapping',
    timestamps: false
});

// itemMasterModel.belongsTo(ComponentMasterModel,{foreignKey:'CompId'});

module.exports = itemCropMappingModel;
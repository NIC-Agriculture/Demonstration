const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const itemMasterModel = require('./ItemMaster.model');

class itemPackageMasterModel extends Model {}

itemPackageMasterModel.init({
    ItemId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: itemMasterModel,
            key: 'ItemId'
        }
    },
    itemPackageSize: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IndicativeCost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    item_unit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCost: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCostPuri: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCostJajpur: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCostJagatsinghpur: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCostDeogarh: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newIndicativeCostSubarnapur: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
}, {
    sequelize,
    modelName: 'itemPackageMasterModel',
    tableName: 'itemPackageMaster',
    timestamps: false
});

itemPackageMasterModel.belongsTo(itemMasterModel,{foreignKey:'ItemId'})

module.exports = itemPackageMasterModel;
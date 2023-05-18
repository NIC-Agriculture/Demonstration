const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');

class itemMasterModel extends Model {}

itemMasterModel.init({
    ItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CompId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        // references: {
        //     model: ComponentMasterModel,
        //     key: 'CompId'
        // }
    },
    ItemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Technical_Status: {
        type: DataTypes.INTEGER,
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'itemMasterModel',
    tableName: 'ItemMaster',
    timestamps: false
});

// itemMasterModel.belongsTo(ComponentMasterModel,{foreignKey:'CompId'});

module.exports = itemMasterModel;
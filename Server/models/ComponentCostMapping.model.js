const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');

class ComponentCostMappingModel extends Model {}

ComponentCostMappingModel.init({
    CompId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: ComponentMasterModel,
            key: 'CompId'
        }
    },
    Total_Cost: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Seed_Per_ha: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    Unit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cost_of_Seed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cost_Kharif: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cost_Rabi: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ComponentCostMappingModel',
    tableName: 'ComponentCostMapping',
    timestamps: false
});

ComponentCostMappingModel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });

module.exports = ComponentCostMappingModel;
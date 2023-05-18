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
        allowNull: false
    },
    Seed_Per_ha: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cost_of_Seed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ComponentCostMappingModel',
    tableName: 'ComponentCostMapping',
    timestamps: false
});

ComponentCostMappingModel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });

module.exports = ComponentCostMappingModel;
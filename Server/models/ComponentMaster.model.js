const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentTypeModel = require('./ComponentType.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class ComponentMasterModel extends Model {}

ComponentMasterModel.init({
    schemeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: SchemeMasterModel,
            key: 'schemeId'
        }
    },
    SubschemeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: SubSchemeMasterModel,
            key: 'SubschemeId'
        }
    },
    CompId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CompName: {
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
    },
    CompTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ComponentTypeModel,
            key: 'CompTypeId'
        }
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Active: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ComponentMasterModel',
    tableName: 'ComponentMaster',
    timestamps: false
});

ComponentMasterModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
ComponentMasterModel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
ComponentMasterModel.belongsTo(ComponentTypeModel, { foreignKey: 'CompTypeId' });

module.exports = ComponentMasterModel;
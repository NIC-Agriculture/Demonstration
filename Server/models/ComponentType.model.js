const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
class ComponentTypeModel extends Model {}

ComponentTypeModel.init({
    CompTypeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    CompTypeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ComponentTypeModel',
    tableName: 'ComponentType',
    timestamps: false
});

module.exports = ComponentTypeModel;
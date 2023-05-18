const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const SchemeMasterModel = require('./SchemeMaster.model');

class SubSchemeMasterModel extends Model {}

SubSchemeMasterModel.init({
    SubschemeId: {
        // type: DataTypes.BIGINT.UNSIGNED,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    schemeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: SchemeMasterModel,
            key: 'schemeId'
        }
    },
    
    SubschemeName: {
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
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Demonstration_Area: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'SubSchemeMasterModel',
    tableName: 'SubSchemeMaster',
    timestamps: false
});

SubSchemeMasterModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });

module.exports = SubSchemeMasterModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const CropMasterModel = require('./CropMaster.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class SubSchemeCropMapModel extends Model {}

SubSchemeCropMapModel.init({
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
    CropId: {
        type: DataTypes.STRING,
        allowNull: false, references: {
            model: CropMasterModel,
            key: 'CropId'
        }
    },
    CropName: {
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
    }
}, {
    sequelize,
    modelName: 'SubSchemeCropMapModel',
    tableName: 'SubSchemeCropMap',
    timestamps: false
});

SubSchemeCropMapModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
SubSchemeCropMapModel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
SubSchemeCropMapModel.belongsTo(CropMasterModel, { foreignKey: 'CropId' });

module.exports = SubSchemeCropMapModel;
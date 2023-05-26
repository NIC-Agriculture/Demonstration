const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');
const ComponentTypeModel = require('./ComponentType.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model')

// const CropMasterModel = require('./CropMaster.model');

class ComponentCropMappingModel extends Model {}

ComponentCropMappingModel.init({
    CompId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: false,
        references: {
            model: ComponentMasterModel,
            key: 'CompId'
        }
    },
    SubschemeId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: false,
    },
    CropId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true,
    },
    FixedCropId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true,
    },
    AdditionalCropId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true,
    },
    SubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    FixedSubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    AdditionalSubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    CompTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ComponentTypeModel,
            key: 'CompTypeId'
        }
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Added_By: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AddedOn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    IPAddress: {
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
    FixedCropSeedPerha: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    FixedCropUnit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FixedCrop_CostofSeed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    AdditionalCropSeedPerha: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    AdditionalCropUnit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AdditionalCrop_CostofSeed: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ComponentCropMappingModel',
    tableName: 'ComponentCropMapping',
    timestamps: false
});

ComponentCropMappingModel.belongsTo(ComponentTypeModel,{foreignKey:'CompTypeId'});
ComponentCropMappingModel.belongsTo(ComponentMasterModel,{foreignKey:'CompId'});

module.exports = ComponentCropMappingModel;
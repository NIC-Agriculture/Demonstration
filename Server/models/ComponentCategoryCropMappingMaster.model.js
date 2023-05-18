const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');
const ComponentTypeModel = require('./ComponentType.model');
const CropMasterModel = require('./CropMaster.model');

class ComponentCategoryCropMappingModel extends Model {}

ComponentCategoryCropMappingModel.init({
    CompId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: ComponentMasterModel,
            key: 'CompId'
        }
    },

    CropId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CropMasterModel,
            key: 'CropId'
        }
    },

    FixedCropId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CropMasterModel,
            key: 'CropId'
        }
    },

    AdditionalCropId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CropMasterModel,
            key: 'CropId'
        }
    },

    CompTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ComponentTypeModel,
            key: 'CompTypeId'
        }
    },

    // SubCropId: {
    //     type: DataTypes.STRING,
    //     primaryKey: true,
    //     allowNull: false,
    //     references: {
    //         model: SubCropMasterModel,
    //         key: 'SubCropId'
    //     }
    // },
    // SubCropName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ComponentCategoryCropMappingModel',
    tableName: 'ComponentCategoryCropMapping',
    timestamps: false
});

ComponentCategoryCropMappingModel.belongsTo(ComponentMasterModel,{foreignKey:'CompId'});
ComponentCategoryCropMappingModel.belongsTo(CropMasterModel,{foreignKey:'CropId'});
ComponentCategoryCropMappingModel.belongsTo(ComponentTypeModel,{foreignKey:'CompTypeId'});

module.exports = ComponentCategoryCropMappingModel;
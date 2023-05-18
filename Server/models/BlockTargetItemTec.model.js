const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');
const itemMasterModel = require('./ItemMaster.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class BlockTargetItemTecModel extends Model {}

BlockTargetItemTecModel.init({
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
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: ComponentMasterModel,
            key: 'CompId'
        }
    },
    ItemId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: itemMasterModel,
            key: 'ItemId'
        }
    },
    Technical_Code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Technical_Name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    itemTechRefNo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'BlockTargetItemTecModel',
    tableName: 'BlockTarget_ItemTechnical',
    timestamps: false
});

BlockTargetItemTecModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
BlockTargetItemTecModel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
BlockTargetItemTecModel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });
BlockTargetItemTecModel.belongsTo(itemMasterModel, { foreignKey: 'ItemId' });

module.exports = BlockTargetItemTecModel;
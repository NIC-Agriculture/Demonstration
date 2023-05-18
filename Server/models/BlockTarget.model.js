const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentCostMappingModel = require('./ComponentCostMapping.model');
const ComponentMasterModel = require('./ComponentMaster.model');
const itemMasterModel = require('./ItemMaster.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubCropMasterModel = require('./SubCropMaster.model');
const SubSchemeCropMapModel = require('./SubSchemeCropMap.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class BlockTargetModel extends Model {}

BlockTargetModel.init({
    BtargetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    DtargetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        // references: {
        //     model: DistrictTargetModel,
        //     key: 'DtargetId'
        // }
    },
    Dist_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Block_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
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
        allowNull: true,
        references: {
            model: itemMasterModel,
            key: 'ItemId'
        }
    },
    bp_ItemId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CropId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: SubSchemeCropMapModel,
            key: 'CropId'
        }
    },
    SubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: SubCropMasterModel,
            key: 'SubCropId'
        }
    },
    Variety_Code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BP_SubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    BP_Variety_Code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    technicalName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PhyGen:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FinGen: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PhySCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FinSCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PhyTASP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FinTASP:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Total_Cost:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AvlPhyGen:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    AvlPhySCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    AvlPhyTASP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalPhyGen: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalPhySCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TotalPhyTASP:{  
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DistributedPhyGen: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DistributedPhySCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DistributedPhyTASP:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Is_Frozen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Added_By: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AddedOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    itemTechRefNo: {
        type: DataTypes.STRING,
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'BlockTargetModel',
    tableName: 'BlockTarget',
    timestamps: true
});

BlockTargetModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
BlockTargetModel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
BlockTargetModel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });
BlockTargetModel.belongsTo(itemMasterModel, { foreignKey: 'ItemId' });
BlockTargetModel.belongsTo(SubSchemeCropMapModel, { foreignKey: 'CropId' });
BlockTargetModel.belongsTo(SubCropMasterModel, { foreignKey: 'SubCropId' });
BlockTargetModel.belongsTo(ComponentCostMappingModel, { foreignKey: 'Total_Cost' });

module.exports = BlockTargetModel;
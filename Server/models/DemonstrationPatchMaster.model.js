const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentCostMappingModel = require('./ComponentCostMapping.model');
const ComponentMasterModel = require('./ComponentMaster.model');
const itemMasterModel = require('./ItemMaster.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubCropMasterModel = require('./SubCropMaster.model');
const SubSchemeCropMapModel = require('./SubSchemeCropMap.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class DemonstrationPatchMastermodel extends Model {}

DemonstrationPatchMastermodel.init({
    DemostrationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
        allowNull: true
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
    Gp_Code: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    lgd_wardcode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Demonstration_Area: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    schemeId: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: SchemeMasterModel,
        //     key: 'schemeId'
        // }
    },
    SubschemeId: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: SubSchemeMasterModel,
        //     key: 'SubschemeId'
        // }
    },
    CompId: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: ComponentMasterModel,
        //     key: 'CompId'
        // }
    },
    bp_ItemId: {
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //     model: itemMasterModel,
        //     key: 'ItemId'
        // }
    },
    CropId: {
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //     model: SubSchemeCropMapModel,
        //     key: 'CropId'
        // }
    },
    SubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //     model: SubCropMasterModel,
        //     key: 'SubCropId'
        // }
    },
    Variety_Code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    BP_SubCropId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    BP_Variety_Code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    itemTechRefNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PhyGen:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PhySCP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PhyTasp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vaw_userId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    vaw_GpCode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AvlPhyGen:{
        type: DataTypes.NUMBER,
        allowNull: true
    },
    AvlPhySCP: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    AvlPhyTASP: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    TotalPhyGen: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    TotalPhySCP: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    TotalPhyTASP:{  
        type: DataTypes.NUMBER,
        allowNull: true
    },
    DistributedPhyGen: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    DistributedPhySCP: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    DistributedPhyTASP:{
        type: DataTypes.NUMBER,
        allowNull: true
    },
    Added_By: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AddedOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    SeedDistributionStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SeedDistributedOn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SeedDistributedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ConfirmBy_vaw: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ConfirmBy_BAO: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
   
}, {
    sequelize,
    modelName: 'DemonstrationPatchMastermodel',
    tableName: 'DemonstrationPatchMaster',
    timestamps: false
});

// // DemonstrationPatchMastermodel.belongsTo(itemMasterModel, { foreignKey: 'ItemId' });
// // DemonstrationPatchMastermodel.belongsTo(SubCropMasterModel, { foreignKey: 'SubCropId' });
// DemonstrationPatchMastermodel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
// DemonstrationPatchMastermodel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
// DemonstrationPatchMastermodel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });
// DemonstrationPatchMastermodel.belongsTo(SubSchemeCropMapModel, { foreignKey: 'CropId' });
// DemonstrationPatchMastermodel.belongsTo(ComponentCostMappingModel, { foreignKey: 'Total_Cost' });

module.exports = DemonstrationPatchMastermodel;
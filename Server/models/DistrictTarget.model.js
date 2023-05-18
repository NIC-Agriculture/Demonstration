const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const ComponentMasterModel = require('./ComponentMaster.model');
const SchemeMasterModel = require('./SchemeMaster.model');
const SubSchemeMasterModel = require('./SubschemeMaster.model');

class DistrictTargetModel extends Model {}

DistrictTargetModel.init({
    DtargetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Dist_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true
    },
    schemeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
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
        allowNull: true,
        // defaultValue: NOW()
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'DistrictTargetModel',
    tableName: 'DistrictTarget',
    timestamps: true
});

DistrictTargetModel.belongsTo(SchemeMasterModel, { foreignKey: 'schemeId' });
DistrictTargetModel.belongsTo(SubSchemeMasterModel, { foreignKey: 'SubschemeId' });
DistrictTargetModel.belongsTo(ComponentMasterModel, { foreignKey: 'CompId' });

module.exports = DistrictTargetModel;
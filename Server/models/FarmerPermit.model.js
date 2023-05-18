const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const SubCropMasterModel = require('./SubCropMaster.model');
const SubSchemeCropMapModel = require('./SubSchemeCropMap.model');

class FarmerPermitMasterModel extends Model {}

FarmerPermitMasterModel.init({
    Permit_NO: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    DemonstrationId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    schemeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CompId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemTechRefNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    FarmerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Gp_Code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FarmerName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Farmer_Category: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    MobileNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandArea: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    CropId: {
        type: DataTypes.STRING,
        allowNull: false,
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
    Variety_Code:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bp_ItemId: {
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
    Added_By: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Fin_year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AddedOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    season: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    saleStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    normalCompTarget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    InctvReferenceNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SubschemeId: {
        type: DataTypes.STRING,
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'FarmerPermitMasterModel',
    tableName: 'Farmer_Permit',
    timestamps: false
});

FarmerPermitMasterModel.belongsTo(SubSchemeCropMapModel, { foreignKey: 'CropId' });
FarmerPermitMasterModel.belongsTo(SubCropMasterModel, { foreignKey: 'SubCropId' });

module.exports = FarmerPermitMasterModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class DealerSaleModel extends Model {}

DealerSaleModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    InvoiceNo: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    Permit_NO: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    DemonstrationId: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true,
    },
    Dist_Code: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    Block_Code: {
        type: DataTypes.STRING,
        // primaryKey: true,
        allowNull: true
    },
    dealerDistrict: {
        type: DataTypes.STRING,
        allowNull: true
    },
    schemeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CompId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FarmerId: {
        type: DataTypes.STRING,
        allowNull: true,
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
        type: DataTypes.STRING,
        allowNull: true
    },
    CropId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Variety_Code:{
        type: DataTypes.STRING,
        allowNull: true
    },
    SoldBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Fin_year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SoldOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dealerLiscenseNo:{
        type: DataTypes.STRING
    },
    season: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verifyStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ItemId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Technical_Code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Technical_Name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    packageSize:{
        type: DataTypes.STRING,
        allowNull: true
    },
    unit:{
        type: DataTypes.STRING,
        allowNull: true
    },
    packagePrice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    packageQuantity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    totalPrice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    eligibleSubsidy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReferenceNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'DealerSaleModel',
    tableName: 'DealerSale',
    timestamps: false
});


module.exports = DealerSaleModel;
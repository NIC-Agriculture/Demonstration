const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class FarmerLandDetailModels extends Model {}

FarmerLandDetailModels.init({
    DemostrationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true
    },
    vaw_userId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    AddedOnPhase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SyncedOnPhase1:{
        type: DataTypes.DATE,
        allowNull: true
    },
    statusPhase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto1Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto2Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto3Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude1Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude1Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude2Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude2Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude3Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude3Phase1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    MobileNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SyncedOnPhase2: {
        type: DataTypes.DATE,
        allowNull: true
    },
    LandPhoto1Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto2Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto3Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude1Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude1Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude2Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude2Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude3Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude3Phase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    statusPhase2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    toDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documentationTakenUp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    organisingFieldDay: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attendedFarmers: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AverageCCresult: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto1Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto2Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LandPhoto3Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude1Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude1Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude2Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude2Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitude3Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitude3Phase3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SyncedOnPhase3: {
        type: DataTypes.DATE,
        allowNull: true
    },
    statusPhase3: {
        type: DataTypes.STRING,
        allowNull: true
    },


 
}, {
    sequelize,
    modelName: 'FarmerLandDetailModels',
    tableName: 'FarmerLandDetails',
    timestamps: false
});


module.exports = FarmerLandDetailModels;
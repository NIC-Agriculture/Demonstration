const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class ADODistBlockMappingModel extends Model {}

ADODistBlockMappingModel.init({
    ADOCode: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true
    },
    DistrictCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    BlockCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ADOName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ADOMobileNo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true
    },
    ADOEmailID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ADOSignature:{
        type: DataTypes.STRING,
        allowNull: true
    },
    
    ADOAadhaarNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ActivateDateTime:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DeactivateDateTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DateTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FinancialYear: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'ADODistBlockMappingModel',
    tableName: 'ADODistBlockMapping',
    timestamps: false
});


module.exports = ADODistBlockMappingModel;


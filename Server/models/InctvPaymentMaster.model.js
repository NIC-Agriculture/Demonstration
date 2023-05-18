const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class InctvPaymentMasterModel extends Model {}

InctvPaymentMasterModel.init({
    Permit_NO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ReferenceNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schemeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TransId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AccountNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AccountHolderName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BankName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IFSC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalEligibleIncentive: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PymntFileDt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    PymntSt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    PymntFileGenerated: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Remark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aadhaarNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pymntType: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'InctvPaymentMasterModel',
    tableName: 'InctvPaymentMaster',
    timestamps: false
});


module.exports = InctvPaymentMasterModel;
    const { Model, DataTypes } = require('sequelize');
    const { sequelize } = require('../config/config');
    
    class PaymentMasterModel extends Model {}
    
    PaymentMasterModel.init({
        InvoiceNo: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey : true
        },
        Permit_NO: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ReferenceNo: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: true
        },
        AccountHolderName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BankName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IFSC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totaleligiblesubsidy: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'PaymentMasterModel',
        tableName: 'PaymentMaster',
        timestamps: false
    });
    
    
    module.exports = PaymentMasterModel;
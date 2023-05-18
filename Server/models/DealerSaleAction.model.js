const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class DealerSaleActionModel extends Model {}

DealerSaleActionModel.init({
    InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baoAction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bao_UserId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baoTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baoRemark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baoIp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adoAction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ado_UserId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adoTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adoRemark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adoIp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ddaAction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dda_UserId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ddaTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ddaRemark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ddaIp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    esignSatus: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'DealerSaleActionModel',
    tableName: 'DealerSaleToAction',
    timestamps: false
});


module.exports = DealerSaleActionModel;
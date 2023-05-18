const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class LightTrapMasterModel extends Model {}

LightTrapMasterModel.init({
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
        primaryKey: true,
        allowNull: true,
    },
    FarmerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    farmerGpCode: {
        type: DataTypes.STRING,
        allowNull: true,
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
        type: DataTypes.NUMERIC,
        allowNull: true
    },
    LightTrap:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PheromoneTrap: {
        type: DataTypes.INTEGER,
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
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    StatusType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Updated_By: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UpdatedOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ConfirmedOn: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'LightTrapMasterModel',
    tableName: 'LightTrapTable',
    timestamps: false
});


module.exports = LightTrapMasterModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const UsersModel = require('./User.model');

class CDAOMasterModel extends Model {}

CDAOMasterModel.init({
    CDAOUserID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        
    },
    Dist_Code: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
       
    },
    
    CDAOName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CDAOMobileNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CDAOEmailID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CDAOAadhaarNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ActivateDateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    DeactivateDateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    DateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    IP_Address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'CDAOMasterModel',
    tableName: 'CDAOMaster',
    timestamps: false
});
CDAOMasterModel.belongsTo(UsersModel, { foreignKey : 'user_id'} )
// CDAOMasterModel.belongsTo(DistrictMasterModel, { foreignKey : 'Dist_Code'} )
module.exports = CDAOMasterModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class DistrictMasterModel extends Model {}

DistrictMasterModel.init({
    Dist_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Dist_Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'DistrictMasterModel',
    tableName: 'LGDistricts',
    timestamps: false
});


module.exports = DistrictMasterModel;
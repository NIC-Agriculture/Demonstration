const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const BlockMasterModel = require('./BlockMaster.model');
const DistrictMasterModel = require('./DistrictMaster.model');

class GPMasterModel extends Model {}

GPMasterModel.init({
    Dist_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: DistrictMasterModel,
            key: 'Dist_Code'
        }
    },
    Block_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: BlockMasterModel,
            key: 'Block_Code'
        }
    },
    Gp_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Gp_Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'GPMasterModel',
    tableName: 'LGGP',
    timestamps: false
});

GPMasterModel.belongsTo(DistrictMasterModel, { foreignKey: 'Dist_Code' });
GPMasterModel.belongsTo(BlockMasterModel, { foreignKey: 'Block_Code' });

module.exports = GPMasterModel;
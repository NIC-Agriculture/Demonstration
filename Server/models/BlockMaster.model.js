const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const DistrictMasterModel = require('./DistrictMaster.model');

class BlockMasterModel extends Model {}

BlockMasterModel.init({
    Block_Code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Dist_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: DistrictMasterModel,
            key: 'Dist_Code'
        }
    },
    Block_Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'BlockMasterModel',
    tableName: 'LGBlocks',
    timestamps: false
});

BlockMasterModel.belongsTo(DistrictMasterModel, { foreignKey: 'Dist_Code' });

module.exports = BlockMasterModel;
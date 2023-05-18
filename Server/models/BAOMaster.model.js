const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const BlockMasterModel = require('./BlockMaster.model');
const DistrictMasterModel = require('./DistrictMaster.model');

class BAOMasterModel extends Model {}

BAOMasterModel.init({
    BAOUserID: {
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
    Block_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: BlockMasterModel,
            key: 'Block_Code'
        }
    },
    BAOName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BAOMobileNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BAOEmailID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BAOAadhaarNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CDAOUserID: {
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
    modelName: 'BAOMasterModel',
    tableName: 'BAOMaster',
    timestamps: false
});

BAOMasterModel.belongsTo(DistrictMasterModel, { foreignKey : 'Dist_Code'});
BAOMasterModel.belongsTo(BlockMasterModel, { foreignKey: 'Block_Code'});

module.exports = BAOMasterModel;
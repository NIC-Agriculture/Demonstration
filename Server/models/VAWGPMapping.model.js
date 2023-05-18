// const { Model, DataTypes } = require('sequelize');
// const { sequelize } = require('../config/config');
// const BlockMasterModel = require('./BlockMaster.model');
// const DistrictMasterModel = require('./DistrictMaster.model');
// const GPMasterModel = require('./GpMaster.model');

// class VAWGPMappingModel extends Model {}

// VAWGPMappingModel.init({
//     user_id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         allowNull: false
//     },
//     Dist_Code: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//             model: DistrictMasterModel,
//             key: 'Dist_Code'
//         }
//     },
//     Block_Code: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//             model: BlockMasterModel,
//             key: 'Block_Code'
//         }
//     },
//     Gp_Code: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//             model: GPMasterModel,
//             key: 'Gp_Code'
//         }
//     },
//     VAWName: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     contactNumber: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     AdhaarNo: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         allowNull: true
//     },
//     Status: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     LogInDate: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: true
//     },
//     IP_Address: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     Fin_Year: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// }, {
//     sequelize,
//     modelName: 'VAWGPMappingModel',
//     tableName: 'VAWGpMapping',
//     timestamps: false
// });

// VAWGPMappingModel.belongsTo(DistrictMasterModel, { foreignKey : 'Dist_Code'});
// VAWGPMappingModel.belongsTo(BlockMasterModel, { foreignKey: 'Block_Code'});
// VAWGPMappingModel.belongsTo(GPMasterModel, { foreignKey: 'Block_Code'});

// module.exports = VAWGPMappingModel;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const UsersModel = require('./User.model');


class ActivityLogModel extends Model {}

ActivityLogModel.init({
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    IPAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DeviceType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Os_Version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Browser_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Browser_version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fin_Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    route: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
{
    sequelize,
    modelName: 'ActivityLogModel',
    tableName: 'ActivityLog',
    timestamps: false
});

ActivityLogModel.belongsTo(UsersModel, { foreignKey: 'user_id' });

module.exports = ActivityLogModel;
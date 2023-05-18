const { Sequelize, Model, DataTypes } = require('sequelize');
const user = 'postgres';
const host = 'localhost';
const database = 'demonstration';
const password = '1234';
const port = 5432;
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 90000,
        idle: 10000
      }
})
exports.sequelize = sequelize;

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Model = Model;
db.DataTypes = DataTypes;

db.UserMaster = require('../models/User.model');
db.CDAOMaster = require('../models/CDAOMaster.model');
db.DistrictMaster = require('../models/DistrictMaster.model');
db.BlockMaster = require('../models/BlockMaster.model');
db.GpMster = require('../models/GpMaster.model');

db.ComponentTypeMaster = require('../models/ComponentType.model')
db.SchemeMaster = require('../models/SchemeMaster.model');
db.SubSchemeMaster = require('../models/SubschemeMaster.model');
db.ComponentMaster = require('../models/ComponentMaster.model');
db.ComponentCostMap = require('../models/ComponentCostMapping.model')

db.CropMaster = require('../models/CropMaster.model');
db.SubCropMaster = require('../models/SubCropMaster.model');
db.SubSchemeCropMap = require('../models/SubSchemeCropMap.model');
// db.ComponentCategoryCropMapping = require('../models/ComponentCategoryCropMappingMaster.model');
db.ComponentCropMapping = require('../models/ComponentCropMapping.model');
db.districtTarget = require('../models/DistrictTarget.model');
db.blockTarget = require('../models/BlockTarget.model')
db.farmerPermit = require('../models/FarmerPermit.model')
db.BlockTargetItemTechnicalMapping= require('../models/BlockTargetItemTec.model')
db.ItemMaster = require('../models/ItemMaster.model');
db.itemPriceDetails = require('../models/ItemPcakagePrice.model')
db.dealerSale = require('../models/DealerSale.model');
db.farmerLand = require('../models/FarmerLandDetails.model');
db.dealerSaleAction = require('../models/DealerSaleAction.model');
db.ADODistBlockMapping = require('../models/ADODistBlockMapping.model');
db.DemonstrationPatch = require('../models/DemonstrationPatchMaster.model')
db.PaymentMaster = require('../models/PaymentMaster.model');
db.InctvPaymentMaster = require('../models/InctvPaymentMaster.model')
db.ActivityLog = require('../models/ActivityLog.model')
db.CropVarietyMaster = require('../models/CropVariety.model');
db.LightTrapMaster = require('../models/LightTrap.model');

exports.db = db;
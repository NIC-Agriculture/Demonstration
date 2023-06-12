const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { verifyAccessToken } = require('./helpers/jwt.helper');
const { permission, multipleRolePermission } = require('./permission/permission')
const device = require('express-device')
// const session = require('express-session');
// const logger = require('morgan');
// const { sequelize } = require('./config/config');
// const sessionObject = {
//     secret: 'Secret is always secret. Dont tell anyone.Because secret is secret.',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         secure: 'auto',
//         maxAge: 60*60 * 60 * 60,
//         path: '/'
//     }
// }
// app.use(logger('dev'));
// app.use(session(sessionObject));

app.use(cors({
  origin: ['http://localhost:4200', 'https://dbtmbdodisha.nic.in/'],
  methods: 'GET, POST, PUT',
  credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(__dirname + '/admin-template'));
app.use(express.static(__dirname + '/homepage-template'));
app.use(device.capture())

app.use('/auth', require('./routes/auth.route'));
app.use('/dealer',verifyAccessToken , permission('DEALER'), require('./routes/dealer.route'));
app.use('/scheme',verifyAccessToken, multipleRolePermission(['SCHEME','OSSC','CDAO','DAFE']), require('./routes/scheme.route'));
app.use('/cdao' ,verifyAccessToken, multipleRolePermission(['CDAO','SCHEME']), require('./routes/cdao.route'));
app.use('/bao', verifyAccessToken, multipleRolePermission(['BAO','DEALER']) , require('./routes/bao.route'));
app.use('/ado', verifyAccessToken, permission('ADO') , require('./routes/ado.route'));
app.use('/vaw', verifyAccessToken, multipleRolePermission(['SCHEME','CDAO', 'BAO', 'ADO', 'VAW']),  require('./routes/vaw.route'));
app.use('/vawMobileApp',  require('./routes/vawMobileApp.route'));
app.use('/ossc',  require('./routes/ossc.route'));
app.use('/api', verifyAccessToken, multipleRolePermission(['SCHEME','CDAO', 'BAO', 'ADO', 'VAW','DAFE','DEALER']), require('./routes/api.route'));
app.use('/dafe', require('./routes/dafe.route'));

app.get('*', (req, res) => res.status(200).send({
    message: 'Sorry, This URL is a private URL. Please change your URL to get benefits.',
  }));


app.use( (req, res, next) => {
    const error = new Error('not Found');
    error.status = 404;
    next(error);
} )

app.use( (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
} )



// console.log(process.env.ACCESS_TOKEN_SECRET);
process.env.ACCESS_TOKEN_SECRET = 'Hello world'
// console.log(process.env.ACCESS_TOKEN_SECRET);

module.exports = app;
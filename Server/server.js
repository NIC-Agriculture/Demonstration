const app = require('./app')

// const cluster = require('cluster');
// const { cpus } = require('os');
// const noOfCPUs = cpus().length;

const { sequelize } = require('./config/config')


const portNo = 80;


sequelize.sync().then(() => {

    app.listen(portNo, console.log(`Demonstration server running on Port ${portNo}`));
    
} ).catch(err => {
    console.error(`Unable to start Server beacuse of unable to connect to  the Database`);
    console.error(err);
})


// sequelize.sync().then(() => {
//         if(cluster.isMaster) {
//             // console.log(cpus());
//             for(let i = 0; i < noOfCPUs; i++) {
//                 cluster.fork();
//             }
//             cluster.on('exit', (worker, code, signal) => {
//                 console.log(`worker ${worker.process.pid} died`);
//                 cluster.fork();
//             })
//         } else {
//             app.listen(portNo, console.log(`OAIC Accounting System Server Running on Worker: ${process.pid} & Port: ${portNo}`));
//         }
// } ).catch(err => {
//     console.error(`Unable to start Server beacuse of unabe to connect to  the Database`);
//     console.error(err);
// })
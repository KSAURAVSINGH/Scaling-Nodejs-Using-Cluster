const cluster = require('node:cluster')
const os = require('os')
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const process = require('node:process');
const apis = require('./routes/apis/apis');
const app = express();
dotenv.config();

const numOfCPUs = os.availableParallelism();
const numOfInstancesToCreate = Math.min(process.env.numInstancesToRun, numOfCPUs)
console.log("Instances to run: ", numOfInstancesToCreate)

app.use(cors());
apis(app);

if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numOfInstancesToCreate; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
}
else{
    app.listen(process.env.PORT, function(){
        console.log(`The server is running on port ${process.env.PORT}`)
        console.log(`Worker ${process.pid} started`);
    })
}


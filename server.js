const express = require('express') ;
const app = require('./app') ;
const server = require('http').Server(app)
require('dotenv').config()
const port = process.env.PORT 
server.listen(port,()=>console.log(`server running in port ${port} `));
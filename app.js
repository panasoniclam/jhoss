const express = require('express')
const app = express()
const logger  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(logger('dev'));
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser:true
    },
    ()=>console.log(`connect mongodb ${process.env.DATABASE_URL}`)
)

//route

const routeUser = require('./app/routes/route.user');
app.use('/api/v1',routeUser)

app.use((req,res,next)=>{
    const err = new Error('not found') ;
    err.status = 404 ;
    next(err)
})
 
app.use((req,res,next)=>{
     const err = app.get('env') === 'development' ? err : {} ;
     const status = err.status || 500 ;
     res.status(status).json({
         message:err.message
     })
  
})

module.exports = app;
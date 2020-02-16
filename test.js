const express = require('express')
const bodyParser = require('body-parser');
const logger = require('morgan') ;
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))
app.post('/user',(req,res,next)=>{
    res.status(200).send({
        message:"dkdkdkdkdk"
    })
})
app.use(logger('dev'));
module.exports = app;
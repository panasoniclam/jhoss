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
//config pig
app.set('view engine','pug')
app.set('views','./views')

//route
const  users= [
            { id:"1",
            name:'lamnn'
            },
            {
                id:"2",
                name:'thangtm'
            }
        ]
const routeUser = require('./app/routes/route.user');
app.use('/api/v1',routeUser)
app.get('/user',(req,res,next)=>{
    res.render('index',{
        name:"lamnn8"
    })
})
app.get('/user',(req,res,next)=>{
    res.render('./users/user',{
       users:users
    })
})
app.get('/users/search',(req,res,next)=>{
    const q = req.query ;
    console.log(q.q)
    const dataUser = users.filter(function(user){
        return user.name.indexOf(q.q) !== -1
    })
    res.render('./users/user',{
        users:dataUser
     })
})
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
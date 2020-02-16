const express = require('express');
const app = express.Router();
const controller_user = require('./../controllers/controller.user') ; 
app.route('/user')
.get((req,res,next)=>{
     res.render('index')
})
app.route('/list')
.get((req,res,next)=>{
     res.render('./users/user')
})
app.route('/create')
.get((req,res,next)=>{
     res.render('./creates/create')
})
app.route('/')
.get(controller_user.findall)
.post(controller_user.create)
module.exports = app;
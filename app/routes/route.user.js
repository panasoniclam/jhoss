const express = require('express');
const app = express.Router();
const controller_user = require('./../controllers/controller.user') ; 
app.route('/')
.post(controller_user.create)

module.exports = app;
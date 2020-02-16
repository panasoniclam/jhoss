const mongoose = require('mongoose')
const bcrypt = require('bcrypt') ; 
const stage = require('./../../config')
const Schema =    mongoose.Schema ;
const userChema = new  Schema({
    username:{
        type:'String',
        trim:true,
        unique:'true',
        required:true
    },
    hash:{
        type:'String',
        trim:true,
        required:true
    }
})
userChema.pre('save', async function(next) {
    const user  =  this ;
    console.log(user)
  await  bcrypt.hash(user.hash,stage.satingRoute,(err,hash)=>{
        if(err){
            console.log(`erorr hash ${user.username}`)
            next()
        }else{
            user.hash = hash
            next()
        }
    })
})

const user = mongoose.model('user',userChema)
module.exports = user;
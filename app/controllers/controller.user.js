const User  = require('./../models/model.user');
const MissingParam = require('./../authenticate/Missingpermission') ;
const jwt =  require('jsonwebtoken')
const stage = require('./../../config')
const bcrypt = require('bcrypt')
module.exports = {
    create: async (req,res,next)=>{
      if (MissingParam.body(req,res,'username')) return  ;
      if(MissingParam.body(req,res,'password')) return ;
      const {username,password} = req.body;
      const user = new User({username:username,hash:password})
      await user.save(user,(err,user)=>{
           let result =  {} ;
           let status = 403 ;
            if(err){
                res.status(403).send({
                    result:'err',
                    status
                })
            }else{
                res.status(200).send({
                    user
                })
            }
      })
    },
    login: async (req,res,next)=>{
       if(MissingParam.body(req,res,'username'))  return false ;
       if(MissingParam.body(req,res,'password')) return false ;
       const {username,pasword}  = req.body ;
       await User.findOne({username:username},(err,user)=>{
           bcrypt.compare(pasword,user.hash)
           .then(math=>{
               const token  = jwt.sign()
           })
       })
    }
    
}
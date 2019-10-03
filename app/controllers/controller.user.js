const User  = require('./../models/model.user');
const MissingParam = require('./../authenticate/Missingpermission') ;
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
    }
}
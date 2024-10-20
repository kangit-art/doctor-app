
const authorisation=(role_array)=>{
  
    return(req,res,next)=>{
       const userRole=req.body.role;
       console.log(userRole)
      if(role_array.includes(userRole)){
        next()
      }else{
        res.send({"msg":"Your are not authorised"})
      }
    }
    
}
module.exports={authorisation}

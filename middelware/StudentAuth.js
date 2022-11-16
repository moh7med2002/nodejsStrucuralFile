const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const error=new Error('No Auth');
        error.statusCode=403;
        throw error;
    }
    const token =authHeader;
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'token');
    }
    catch(err){
        throw err;
    }
    if(!decodedToken){
        const error=new Error('No Auth');
        error.statusCode=403;
        throw error;
    }
    req.studentId=decodedToken.studentId;
    return next();
}
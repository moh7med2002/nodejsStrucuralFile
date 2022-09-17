const express=require('express');
const barserBody=require('body-parser');
const multer=require('multer');
const path=require('path');
const mongoose=require('mongoose')
const app=express();




const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(barserBody.json());
app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,DELETE,POST,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    if(req.method ==="OPTIONS"){
        return res.sendStatus(200);
    }
    next();
});


app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message, data:data});
});

mongoose.connect('mongodb+srv://mohamed:059283805928388@cluster0.aueco.mongodb.net/socialmedia?retryWrites=true&w=majority')
.then((result)=>{
    console.log("server connect");
    app.listen(process.env.PORT || 8080);
    })
.catch(err=>{
    console.log(err);
});
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//middlewares
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'publi/assets')));



/* storage */
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"public/assets");
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
});
const upload=multer({storage});


//mongoose connection
await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("db connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server running on port ${process.env.PORT}`)
    })
})
.catch(err=>{
    console.log("db failed to connect");
});




































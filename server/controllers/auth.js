import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


//register
export const register =async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }= req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);
        
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            picturePath,
            friends,
            location,
            occupation

        });
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err)
    {
      res.status(500).json({error:err.message});
    }
}
import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type: String,
            require:true,
            min:2,
            max:50,
        },
        lastName:{
            type: String,
            require:true,
            min:2,
            max:50,
        },
        email:{
            type: String,
            require:true,
            unique:true,
        },
        password:{
            type: String,
            require:true,
            min:5
        },
        picturePath:{
            type: String,
            default:"",
        },
        friends:{
            type:Array,
            default:[],
        },
        location:String,
        occupation:String,
    },{timestamps:true}
);

export default User=mongoose.model("User",userSchema);
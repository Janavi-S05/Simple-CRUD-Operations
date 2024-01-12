const mongoose=require("mongoose");
const userSchema=mongoose.Schema(
    {
        _id: { 
            type: Number
        },
        name: {
            type: String,
            required: [true, "Add the user name"],
        },
        email: {
            type: String,
            required: [true, "Add the email"],
        },
    },
    { 
        versionKey: false 
    }
)
module.exports=mongoose.model("Users",userSchema);
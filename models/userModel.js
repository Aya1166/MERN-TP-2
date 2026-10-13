const mongose = require("mongoose");

const userSchema = new mongose.Schema(
    {
        name : {
            type: String,
            required: [true, "Le nom est obligatoire"],
            trim: true
        },
        email : {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            lowercase: true, 
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "L'email est invalide"]
        },
        role : {
            type: String,
            enum: ["user", "admin"],
            message: `{VALUE} n'est pas un role valide`
            },
            default: "user"
            }
    } 
        {
            timestamps: true
        }
);

module.exports = mongose.model("User", userSchema);
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'user',
        enum: ["admin", "user"]
    },
    name: {
        type: String,
        required: [true, "Every user must have a name"]
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: props => `${props.value} is not a valid email address`
          },
        required: [true, "Every user must have a email"]
    },
    password: {
        type: String, 
        required: [true, "Every user must have a password"],
        select: false
    },
},{
    versionKey: false // You should be aware of the outcome after set to false
})

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
})


userSchema.methods.checkPassword = async function(candidatePassword, encryptedPassword) {
    return await bcrypt.compare(candidatePassword, encryptedPassword)
}

const User = mongoose.model("User", userSchema)

module.exports = User
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
        require : [true,"Please add a text value"]
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Goal",goalSchema);
const  mongoose  = require("mongoose");

const classSchema = new mongoose.Schema({
    // name:{type:String, require:true},
    // classId : {type:String, unique:true},
    // StudentId :{type:String, unique:true},
    class :{type:String},
    StudentCount : {type:Number}
})

const model = mongoose.model("student", classSchema)

module.exports = model
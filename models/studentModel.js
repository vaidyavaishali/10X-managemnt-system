const  mongoose  = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{type:String, require:true},
    classId : {type:String, ref:"student"},
    StudentId :{type:String, unique:true},
    // class :{type:String},
    // StudentCount : {type:Number}
})

const model = mongoose.model("class", studentSchema)

module.exports = model
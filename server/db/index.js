
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String
  });


const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: Number,
    published:Boolean,
    deadline: Date, 
    Id: String
});
    


const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);


module.exports = {
    User,
    Task
  }
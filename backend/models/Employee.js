const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name:String,
  email:String,
  age:Number,
  role:String,
  salary:Number
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
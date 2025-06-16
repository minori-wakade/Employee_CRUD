const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required:true,
  },
  email: {
    type: String,
    unique: true,
    required:true,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    required:true,
  },
  salary: {
    type: Number,
    required:true,
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
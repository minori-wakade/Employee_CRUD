const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
  },
  salary: {
    type: Number,
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

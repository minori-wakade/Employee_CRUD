const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require("./models/Employee")
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


app.post("/addEmployee",(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))

})
app.get("/",(req,res)=>{
    EmployeeModel.find()
    .then(employee=>res.json(employee))
    .catch(err=>res.json(err))

})
app.get('/:id', async (req, res) => {
  const emp = await EmployeeModel.findById(req.params.id);
  res.json(emp);
});

app.put('/update/:id', async (req, res) => {
  await EmployeeModel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Updated successfully' });
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeeModel.findByIdAndDelete(id);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting employee");
  }
});


app.listen(PORT,()=>{
    console.log("Server is running")
})
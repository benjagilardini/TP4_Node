const mongoose = require("mongoose");
const {Schema} = mongoose;

const EmployeeFields = {
    dni: Number,
    first_name: String,
    last_name: String,
    gender: String,
    birth_date: Date,
    hire_date: Date,
};
const EmployeeSchema = new Schema(EmployeeFields);

const Employee = mongoose.model("Employees", EmployeeSchema);
if(!Employee.collection.collection){
    Employee.createCollection();
}

module.exports = {Employee, EmployeeFields};

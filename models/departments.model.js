const mongoose = require("mongoose");
const {Schema} = mongoose;

const DepartmentFields = {
    dept_name: String
};
const DepartmentSchema = new Schema(DepartmentFields);

const Departments = mongoose.model("Departments", DepartmentSchema);
if(!Departments.collection.collection){
    Departments.createCollection();
}

module.exports = {Departments, DepartmentFields};

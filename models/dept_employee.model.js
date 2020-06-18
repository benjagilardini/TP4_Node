const mongoose = require("mongoose");
const {Schema} = mongoose;

const Dept_EmployeeFields = {
    empId: mongoose.Schema.Types.ObjectId,
    deptId:mongoose.Schema.Types.ObjectId,
    from_date: Date,
    to_date: Date,
};

const Dept_EmployeeSchema = new Schema(Dept_EmployeeFields);

const Dept_Employees = mongoose.model("Dept_Employees", Dept_EmployeeSchema);
if(!Dept_Employees.collection.collection){
    Dept_Employees.createCollection();
}

module.exports = {Dept_Employees, Dept_EmployeeFields};

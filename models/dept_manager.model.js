const mongoose = require("mongoose");
const {Schema} = mongoose;

const Dept_ManagerFields = {
    empId: mongoose.Schema.Types.ObjectId,
    deptId:mongoose.Schema.Types.ObjectId,
    from_date: Date,
    to_date: Date,
};

const Dept_ManagerSchema = new Schema(Dept_ManagerFields);

const Dept_Managers = mongoose.model("Dept_Managers", Dept_ManagerSchema);
if(!Dept_Managers.collection.collection){
    Dept_Managers.createCollection();
}

module.exports = {Dept_Managers, Dept_ManagerFields};

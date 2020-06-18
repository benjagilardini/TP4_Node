const mongoose = require("mongoose");
const {Schema} = mongoose;

const SalariesFields = {
    empId: mongoose.Schema.Types.ObjectId,
    salary: Number,
    from_date: Date,
    to_date: Date,
};

const SalariesSchema = new Schema(SalariesFields);

const Salaries = mongoose.model("Salaries", SalariesSchema);
if(!Salaries.collection.collection){
    Salaries.createCollection();
}

module.exports = {Salaries, SalariesFields};

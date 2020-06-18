const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TitlesFields = {
    empId:mongoose.Schema.Types.ObjectId,
    title:String,
    from_date:Date,
    to_date:Date
}

const TitlesSchema = new Schema(TitlesFields);

const Titles = mongoose.model('Titles',TitlesSchema);

if (!Titles.collection.collection){
    Titles.createCollection();
}

module.exports ={Titles, TitlesFields};

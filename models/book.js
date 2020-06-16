const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookFields = {
    name: String,
    authorID: Schema.Types.ObjectId,
}

const bookSchema = new Schema(bookFields);

const Book = mongoose.model('Book', bookSchema);
if(!Book.collection.collection){
    Book.createCollection();
};

module.exports = { Book, bookFields };
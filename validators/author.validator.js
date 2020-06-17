const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Author } = require('../models/author');
const { Book } = require('../models/book');

const CantRepeatName = {
    validate: async function (typeName, originalObject, materializedObject) {
        const AuthorFinded =
            await Author.findOne({ 'name': materializedObject.name });

        if (AuthorFinded && AuthorFinded._id != materializedObject.id) {
            throw new CantUpdateAuthorWithNameUsedError(typeName);
        }
    }
};
class CantUpdateAuthorWithNameUsedError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Name cant be repeated', 'CantUpdateAuthorWithNameUsedError')
    }
};
const CantDeleteAuthorWithBooks = {
    validate: async function (typeName, originalObject, materializedObject) {
        const BookFinded = 
        await Book.findOne({'AuthorID': originalObject});

        if (BookFinded) {
            throw new CantDeleteAuthorWithBooksError(typeName);
        }
    }};
class CantDeleteAuthorWithBooksError extends GNXError {
    constructor(typeName){
        super(typeName, 'Author have at least 1 book related','CantDeleteAuthorWithBooksError');
    }
};

module.exports = {
    CantRepeatName,
    CantDeleteAuthorWithBooksError
}
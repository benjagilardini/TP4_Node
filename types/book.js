const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const AuthorType = require("./author");

const Author = require("../models/author").Author;
const BookModel = require("../models/book").Book;

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
    name: "BookType",
    description: "represent books",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        authors: {
            type: AuthorType,
            extensions: {
                relation: {
                    connectionField: 'AuthorID',
                },
            },
            resolve(parent, args) {
                return Author.findById(parent.AuthorID);
            },
        },
    }),
});
gnx.connect(BookModel, BookType, 'book', 'books');

module.exports = BookType;
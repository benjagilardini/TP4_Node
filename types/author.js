const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Author = require("../models/author").Author;
const Book = require("../models/book").Book;

const {
    CantRepeatName,
    CantDeleteAuthorWithBooks,
} = require('../validators/author.validator');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    description: "represent authors",
    extensions: {
        validations: {
            'UPDATE':
                [
                    CantRepeatName,
                ],
            'DELETE':
                [
                    CantDeleteAuthorWithBooks,
                ]
        },
    },
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'AuthorID',
                },
            },
            resolve(parent, args) {
                return Book.find({ 'AuthorID': parent.id });
            },
        },
    }),
});
// const AuthorType = new GraphQLObjectType({
//     name: "AuthorType",
//     description: "represent authors",
//     extensions: {
//         validations: {
//             'UPDATE':
//                 [
//                     CantRepeatName,
//                 ],
//             'DELETE':
//                 [
//                     CantDeleteAuthorWithBooks,
//                 ]
//         },
//     },
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         books: {
//             type: new GraphQLList(BookType),
//             extensions: {
//                 relation: {
//                     embedded: false,
//                     connectionField: 'AuthorID',
//                 },
//             },
//             resolve(parent, args) {
//                 return Book.find({ 'AuthorID': parent.id });
//             }
//         },
//     }),
// });
gnx.connect(Author, AuthorType, 'author', 'authors');

module.exports = AuthorType;

const BookType = require('./book');

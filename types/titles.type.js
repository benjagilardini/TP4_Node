const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const TitlesModel = require("../models/titles.model").Titles;
const EmployeesModel = require("../models/employees.model").Employee;

const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
} = graphql;

const TitlesType = new GraphQLObjectType({
    name: "TitlesType",
    description: "represent job titles",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    connectionField: "empId",
                    embedded: false,
                },
            },
            resolve(parent, args) {
                return EmployeesModel.findById(parent.empId);
            },
        },
        title: { type: GraphQLNonNull(GraphQLString) },
        from_date: { type: GraphQLNonNull(GraphQLString) },
        to_date: { type: GraphQLNonNull(GraphQLString) },
    }),
});

gnx.connect(TitlesModel, TitlesType, "title", "titles");
module.exports = TitlesType;
const EmployeeType = require('./employees.type');
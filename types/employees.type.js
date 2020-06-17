const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const EmployeeModel = require("../models/employees.model").Employee;
const GenderType = require('./enums/gender.type');

const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: "EmployeeType",
    description: "represent employees",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        dni: { type: GraphQLNonNull(GraphQLInt) },
        first_name: { type: GraphQLNonNull(GraphQLString) },
        last_name: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GenderType) },
        birth_date: { type: GraphQLNonNull(GraphQLString) },
        hire_date: { type: GraphQLNonNull(GraphQLString) }
    })
});

gnx.connect(EmployeeModel, EmployeeType, 'employee', 'employees');
module.exports = EmployeeType;
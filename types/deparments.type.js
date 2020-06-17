const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const DepartmentModel = require("../models/departments.model").Departments;

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} = graphql;

const DepartmentType = new GraphQLObjectType({
    name: "DepartmentType",
    description: "represent departments",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },      
        dept_name: { type: GraphQLNonNull(GraphQLString) }
    })
});

gnx.connect(DepartmentModel, DepartmentType, 'department', 'departments');
module.exports = DepartmentType;
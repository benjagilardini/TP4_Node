const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const DepartmentModel = require("../models/departments.model").Departments;

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} = graphql;
const {
    ValidatorDepartmentName,
    ValidatorifChilds
} = require('../validators/departments.validator');

const DepartmentType = new GraphQLObjectType({
    name: "DepartmentType",
    description: "represent departments",
    extensions: {
		validations: {
			CREATE: [ValidatorDepartmentName],
            UPDATE: [ValidatorDepartmentName],
            DELETE: [ValidatorifChilds]
		}
	},
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },      
        dept_name: { type: GraphQLNonNull(GraphQLString) }
    })
});

gnx.connect(DepartmentModel, DepartmentType, 'department', 'departments');
module.exports = DepartmentType;

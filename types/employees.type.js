const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const EmployeeModel = require("../models/employees.model").Employee;
const GenderType = require('./enums/gender.type');
const { GraphQLDate } = require("graphql-iso-date");

const {
	GraphQLString,
	GraphQLID,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLNonNull,
} = graphql;

const {
	ValidatorDni,
	ValidatorAge,
	ValidatorEmployeeWithSalary
} = require("../validators/employees.validator");

const EmployeeType = new GraphQLObjectType({
	name: "EmployeeType",
	description: "represent employees",
	extensions: {
		validations: {
			CREATE: [ValidatorDni, ValidatorAge],
			UPDATE: [ValidatorDni, ValidatorAge],
			DELETE: [ValidatorEmployeeWithSalary]
		}
	},
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLID) },
		dni: { type: GraphQLNonNull(GraphQLInt) },
		first_name: { type: GraphQLNonNull(GraphQLString) },
		last_name: { type: GraphQLNonNull(GraphQLString) },
		gender: { type: GraphQLNonNull(GenderType) },
		birth_date: { type: GraphQLDate },
		hire_date: { type: GraphQLDate }
	})
});

gnx.connect(EmployeeModel, EmployeeType, 'employee', 'employees');
module.exports = EmployeeType;

const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const SalariesModel = require("../models/salaries.model").Salaries;
const EmployeesModel = require("../models/employees.model").Employee;
const { GraphQLDate } = require("graphql-iso-date");

const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;

const {
	ValidatorIfSalaryNotPositive
} = require("../validators/salaries.validator");

const {
	ValidatorDatetimeDifference
} = require("../validators/interval_date.validator");

const SalariesType = new GraphQLObjectType({
    name: "SalariesType",
    description: "represent salaries",
    extensions: {
		validations: {
			CREATE: [ValidatorIfSalaryNotPositive, ValidatorDatetimeDifference],
			UPDATE: [ValidatorIfSalaryNotPositive, ValidatorDatetimeDifference]
		}
	},
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
        salary: { type: GraphQLNonNull(GraphQLInt) },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
    }),
});

gnx.connect(SalariesModel, SalariesType, "salary", "salaries");
module.exports = SalariesType;
const EmployeeType = require('./employees.type');

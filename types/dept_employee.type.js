const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Dept_EmployeeModel = require("../models/dept_employee.model").Dept_Employees;
const EmployeesModel = require("../models/employees.model").Employee;
const DepartmentsModel = require("../models/departments.model").Departments;

const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;

const Dept_EmployeeType = new GraphQLObjectType ({
    name: "Dept_EmployeeType",
    description: "represent department employees",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
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
        department:{
            type: DepartmentType,
            extensions: {
                relation:{
                    connectionField: "deptId",
                    embedded: false,
                },
            },
            resolve(parent, args) {
                return DepartmentsModel.findById(parent.deptId);
            }
        },
        from_date: { type: GraphQLNonNull(GraphQLString) },
        to_date: { type: GraphQLNonNull(GraphQLString) },
    })
});

gnx.connect(Dept_EmployeeModel, Dept_EmployeeType, "dept_employee", "dept_employees");
module.exports = Dept_EmployeeType;
const EmployeeType = require('./employees.type');
const DepartmentType = require("./deparments.type");

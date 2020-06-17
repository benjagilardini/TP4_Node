const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Dept_ManagerModel = require("../models/dept_manager.model").Dept_Managers;
const EmployeesModel = require("../models/employees.model").Employee;
const DepartmentsModel = require("../models/departments.model").Departments;

const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
} = graphql;

const Dept_ManagerType = new GraphQLObjectType ({
    name: "Dept_ManagerType",
    description: "represent department managers",
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

gnx.connect(Dept_ManagerModel, Dept_ManagerType, "dept_manager", "dept_managers");
module.exports = Dept_ManagerType;
const EmployeeType = require('./employees.type');
const DepartmentType = require("./deparments.type");

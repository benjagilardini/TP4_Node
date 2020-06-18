const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const EmployeesModel = require("../models/employees.model").Employee;
const SalariesModel = require("../models/salaries.model").Salaries;

const ValidatorDni = {
    validate: async function (typeName, materializedObject) {
        const EmployeeFound =
            await EmployeesModel.findOne({ dni: materializedObject.dni });

        if (EmployeeFound && EmployeeFound._id != materializedObject.id) {
            throw new IdenticalIDsError(typeName);
        }
    }
};

class IdenticalIDsError extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Cant exist two identical IDs", "IdentialIDsError"
        );
    }
}

const ValidatorAge = {
    validate: async function (typeName, materializedObject) {
        let current_date = new Date();
        let birthdate = new Date(materializedObject.birth_date);
        let ageEmployee = current_date.getFullYear() - birthdate.getFullYear();
        let monthDifference = current_date.getMonth() - birthdate.getMonth();
        if (monthDifference < 0 || (m == 0 && current_date.getDate() < birt_date.getDate())) {
            ageEmployee -= 1;
        }
        if (ageEmployee < 18) {
            throw new MinorEmployeeError(typeName);
        }
    }
}
class MinorEmployeeError extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "employee age below 18", "MinorEmployeeError"
        );
    }
}

const ValidatorEmployeeWithSalary = {
    validate: async function(typeName,originalObject){
        const EmployeeSalary = await SalariesModel.findOne({'empId': originalObject})

        if(EmployeeSalary){
            throw new TryDeleteEmployeeWithSalaryError(typeName);
        }
    }
}

class TryDeleteEmployeeWithSalaryError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            "Employee have at least 1 salary related", "TryDeleteEmployeeWithSalaryError"
        )
    }
}

module.exports = {
    ValidatorDni,
    ValidatorAge,
    ValidatorEmployeeWithSalary
};

const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const TitlesModel = require("../models/titles.model").Titles;
const Dept_ManagerModel = require("../models/dept_manager.model").Dept_Managers;
const DepartmentsModel = require("../models/departments.model").Departments;
const Dept_EmployeeModel = require("../models/dept_employee.model").Dept_Employees;

const ValidatorDepartmentName = {
    validate: async function (typeName, materializedObject) {
        const deptName =
            await DepartmentsModel.findOne({ dept_name: materializedObject.dept_name });

        if (deptName && deptName._id != materializedObject.id) {
            throw new IdenticalDeptNamesError(typeName);
        }
    }
};

class IdenticalDeptNamesError extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Cant exist two identical departments names", "IdenticalDeptNamesError"
        );
    }
}

const ValidatorifChilds = {
    validate: async function (typeName, originalObj) {
        const titles = await TitlesModel.findOne({ deptId: originalObject });
        const employee = await Dept_EmployeeModel.findOne({ deptId: originalObj });
        const manager = await Dept_ManagerModel.findOne({ deptId: originalObj });
        if (employee || manager || titles) {
            throw new TryDeleteWithChildsError(typeName);
        }
    },
};


class TryDeleteWithChildsError extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Cant delete a collection that have children","TryDeleteWithChildsError"
        );
    }
}

module.exports = {
    ValidatorDepartmentName,
    ValidatorifChilds
}

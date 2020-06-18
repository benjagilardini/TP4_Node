const gnx = require("@simtlix/gnx");
const SalariesModel = require("../models/salaries.model").Salaries;
const GNXError = gnx.GNXError;

const ValidatorIfSalaryNotPositive = {
  validate: async function (typeName, materializedObject) {
    let employeeSalary = materializedObject.salary;
    if (employeeSalary < 0) {
      throw new SalaryMustBePositiveError(typeName);
    }
  },
};

class SalaryMustBePositiveError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "SalaryMustBePositiveError","Salaries cant be negative"
    );
  }
}

module.exports = { 
    ValidatorIfSalaryNotPositive
};

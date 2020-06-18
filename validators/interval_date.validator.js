const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const ValidatorDatetimeDifference = {
    validate: async function (typeName, materializeObject){
        let initialDate = materializeObject.from_date;
        let lastDate = materializeObject.to_date;
        if( initialDate >= lastDate){
            throw new DeptManagerTimeError(typeName);
        }
    }
};

class DeptManagerTimeError extends GNXError {
    constructor(typeName){
        super(
            typeName,
            "Must has an interval between to_date and from_date", "DeptManagerTimeError"
        )
    }
}

module.exports = {
    ValidatorDatetimeDifference
}

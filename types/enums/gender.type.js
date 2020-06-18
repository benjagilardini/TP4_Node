const { GraphQLEnumType } = require("graphql");

const GenderTypeEnum = new GraphQLEnumType({
  name: "SexTypeEnum",
  values: {
    M: {
      value: "Male"
    },
    F: {
      value: "Female"
    }
  }
});

module.exports = GenderTypeEnum;

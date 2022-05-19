const { gql } = require("apollo-server");

const typeDefs = gql`
  type DeploymentFrequency {
    deploymentFrequencyValue(owner: String, repo: String): String
    numberOfDeployments(owner: String, repo: String): Int
  }
  type LeadTimeForChange {
    leadTimeValue(owner: String, repo: String): String
    leadTime(owner: String, repo: String): String
  }
  type Query {
    deploymentFrequency: [DeploymentFrequency]
    leadTimeForChange: [LeadTimeForChange]
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server");

const typeDefs = gql`
  type DeploymentFrequency {
    deploymentFrequencyValue(org: String, repo: String): String
    numberOfDeployments(org: String, repo: String): Int
  }
  type LeadTimeForChange {
    leadTimeValue(org: String, repo: String): String
    leadTime(org: String, repo: String): String
  }
  type Query {
    deploymentFrequency: [DeploymentFrequency]
    leadTimeForChange: [LeadTimeForChange]
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server");

const typeDefs = gql`
  type DeploymentFrequency {
    deploymentFrequencyValue: String
    numberOfDeployments: Int
  }
  type LeadTimeForChange {
    leadTimeValue: String
    leadTime: String
  }
  type Query {
    deploymentFrequency(owner: String, repo: String): DeploymentFrequency
    leadTimeForChange(owner: String, repo: String): LeadTimeForChange
  }
`;

module.exports = typeDefs;

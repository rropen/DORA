import { print } from 'graphql';
import { GraphQLClient, gql } from 'graphql-request';
require('dotenv').config();

const gh_api_url = `https://api.github.com/graphql`;
const gh_pat = process.env.GH_PAT || 'Key';
const auth = `Bearer ${gh_pat}`;
console.log(gh_pat)
const graphQLClient = new GraphQLClient(gh_api_url, {
  headers: {
    authorization: auth,
  },
});

export const deployments = async (owner: string, repo: string) => {
  const query_deployment = gql`
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        releases(last: 21) {
          edges {
            node {
              name
              publishedAt
            }
          }
        }
      }
    }
  `;
  let variables = { owner: owner, repo: repo };
  const data = await graphQLClient.request({
    document: query_deployment,
    variables: variables,
  });

  let deployment_nodes = data.repository.releases.edges;
  let numberOfDeployments = 0;
  let deploymentFrequency = ''
  let counter = 0;
  let todayDate = new Date();
  let thirtyDaysAgo = new Date().setDate(todayDate.getDate() - 30);
  let today = todayDate.getTime()

  for (deployment_nodes.node in deployment_nodes) {
    let publishedDate = Date.parse(
      deployment_nodes[counter]['node']['publishedAt']
    );
    if ( today > publishedDate && publishedDate > thirtyDaysAgo){
        numberOfDeployments += 1
    }
    counter++
  }
  
   // Number Deployments
    if (numberOfDeployments > 20)
        deploymentFrequency = "Elite"
    else if (20 > numberOfDeployments && numberOfDeployments > 5)
        deploymentFrequency = "High"
    else if (5 > numberOfDeployments && numberOfDeployments > 2)
        deploymentFrequency = "Medium"
    else if (2 >= numberOfDeployments && numberOfDeployments>= 1)
        deploymentFrequency = "Low"
    else
        deploymentFrequency = "N/A"

  return {
    deploymentFrequency: deploymentFrequency,
    numberOfDeployments: numberOfDeployments,
  };
};

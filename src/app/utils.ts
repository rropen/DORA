import { print } from "graphql";
import { GraphQLClient, gql } from "graphql-request";
require("dotenv").config();

const gh_api_url = `https://api.github.com/graphql`;
const gh_pat = process.env.GH_PAT || "Key";
const auth = `Bearer ${gh_pat}`;
const graphQLClient = new GraphQLClient(gh_api_url, {
  headers: { authorization: auth },
});

export const deployments = async (owner: string, repo: string) => {
  const queryDeployment = gql`
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
    document: queryDeployment,
    variables: variables,
  });

  let deploymentNodes = data.repository.releases.edges;
  let numberOfDeployments = 0;
  let deploymentFrequency = "";
  let counter = 0;
  let todayDate = new Date();
  let ninetyDaysAgo = new Date().setDate(todayDate.getDate() - 90);
  let today = todayDate.getTime();

  for (deploymentNodes.node in deploymentNodes) {
    let publishedDate = Date.parse(
      deploymentNodes[counter]["node"]["publishedAt"]
    );
    if (today > publishedDate && publishedDate > ninetyDaysAgo) {
      numberOfDeployments += 1;
    }
    counter++;
  }

  // Number Deployments
  if (numberOfDeployments > 90) {
    deploymentFrequency = "Elite";
  } else if (90 >= numberOfDeployments && numberOfDeployments > 13) {
    deploymentFrequency = "High";
  } else if (13 > numberOfDeployments && numberOfDeployments > 3) {
    deploymentFrequency = "Medium";
  } else if (3 >= numberOfDeployments && numberOfDeployments >= 1) {
    deploymentFrequency = "Low";
  } else {
    deploymentFrequency = "N/A";
  }
  return {
    deploymentFrequencyValue: deploymentFrequency,
    numberOfDeployments: numberOfDeployments,
  };
};

export const leadTimeFunction = async (owner: string, repo: string) => {
  // Query Lead Time Change
  const queryPullRequests = gql`
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        pullRequests(last: 5, states: [MERGED]) {
          edges {
            node {
              createdAt
              mergedAt
            }
          }
        }
      }
    }
  `;

  let variables = { owner: owner, repo: repo };
  const data = await graphQLClient.request({
    document: queryPullRequests,
    variables: variables,
  });
  let pullRequestNodes = data.repository.pullRequests.edges;
  let numberOfMerges = 0;
  let leadTimeArray = [];
  let counter = 0;
  let todayDate = new Date();
  let thirtyDaysAgo = new Date().setDate(todayDate.getDate() - 90);
  let today = todayDate.getTime();

  for (pullRequestNodes.node in pullRequestNodes) {
    let createdDate = Date.parse(
      pullRequestNodes[counter]["node"]["createdAt"]
    );

    let mergedDate = Date.parse(pullRequestNodes[counter]["node"]["mergedAt"]);

    if (today > mergedDate && mergedDate > thirtyDaysAgo) {
      numberOfMerges += 1;
      let leadTimeValue = (mergedDate - createdDate) / 1000 / 86400;
      leadTimeArray.push(leadTimeValue);
    }
    counter++;
  }

  console.log("success");

  const leadTimeTotal = leadTimeArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  let leadTime = Math.round(leadTimeTotal / leadTimeArray.length);

  let leadTimeForChange = "";
  if (leadTime <= 1) {
    leadTimeForChange = "Elite";
  } else if (1 < leadTime && leadTime <= 7) {
    leadTimeForChange = "High";
  } else if (7 < leadTime && leadTime <= 30) {
    leadTimeForChange = "Medium";
  } else if (30 < leadTime && leadTime <= 90) {
    leadTimeForChange = "Low";
  } else {
    leadTimeForChange = "N/A";
    leadTime = 0;
  }
  return { leadTimeValue: leadTimeForChange, leadTime: leadTime };
};

export const timeToRestore = async (owner: string, repo: string) => {
  //Query Risk Issues
  const queryRiskIssues = gql`
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        risk: issues(labels: "risk", first: 100) {
          edges {
            node {
              title
              createdAt
              closedAt
            }
          }
        }
      }
    }
  `;
  let variables = { owner: owner, repo: repo };
  const data = await graphQLClient.request({
    document: queryRiskIssues,
    variables: variables,
  });
  console.log(data.repository.risk.edges[0].node);
};

timeToRestore("rropen", "MEC");

import { deployments, leadTimeFunction } from "./utils";

const resolvers = {
  Query: {
    //@ts-ignore
    deploymentFrequency: (parent, args, context, info) => {
      if (!context.authenticated) return null;
      return [deployments(info.variableValues.owner, info.variableValues.repo)];
    },
    //@ts-ignore
    leadTimeForChange: (parent, args, context, info) => {
      if (!context.authenticated) return null;
      return [
        leadTimeFunction(info.variableValues.owner, info.variableValues.repo),
      ];
    },
  },
};

module.exports = resolvers;

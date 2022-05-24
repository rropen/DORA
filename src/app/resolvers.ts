import { deployments, leadTimeFunction } from "./utils";

const resolvers = {
  Query: {
    //@ts-ignore
    deploymentFrequency: (parent, args, context, info) => {
      if (!context.authenticated) return null;
      return deployments(args.owner, args.repo);
    },
    //@ts-ignore
    leadTimeForChange: (parent, args, context, info) => {
      if (!context.authenticated) return null;
      return [leadTimeFunction(args.owner, args.repo)];
    },
  },
};

module.exports = resolvers;

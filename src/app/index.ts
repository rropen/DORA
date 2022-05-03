import { deployments, leadTimeForChange } from "./utils";
import express, { response } from "express";
import { print } from "graphql";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Rolls-Royce Dora Metrics API Data Source is Working.",
    date: new Date(),
  };
  res.status(200).send(data);
});

// app.get('/options', (req, res) => {
//   res.status(200).send('annotations/options endpoint is functional.');
// });

// app.get('/search', (req, res) => {
//   res
//     .status(200)
//     .send([
//       'deploymentFrequency',
//       'numberDeployments',
//       'leadTimeForChanges',
//       'leadTime',
//     ]);
// });

// app.get('/annotations', (req, res) => {
//   res.status(200).send([]);
// });

app.get("/query", async (req, res) => {
  const token = req.headers["token"];
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const metric = req.query.metric as string;

  if (token === process.env.TOKEN_SECRET) {
    if (owner && repo) {
      if (metric === "deploymentFrequency") {
        const deploymentData = await deployments(owner, repo);
        res.status(200).json(deploymentData);
      } else if (metric === "leadTimeForChange") {
        const leadTimeForChangeData = await leadTimeForChange(owner, repo);
        res.status(200).json(leadTimeForChangeData);
      } else {
        res.status(400).send("Metric parameter must be passed");
      }
    } else {
      res.status(400);
      res.send(
        "Error: Please pass both an owner (github org name) and repo (github repo name) as scopedVars from Grafana."
      );
    }
  } else if (!token) {
    res.status(403).send("Need a token for this endpoint");
  } else {
    res.status(403).send("Forbidden Incorrect Token");
  }
});

const server = app.listen(3000, () =>
  console.log(
    `
Server ready at: http://localhost:3000`
  )
);

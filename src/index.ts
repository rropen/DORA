import { deployments } from './utils';
import express, { response } from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Rolls-Royce Dora Metrics API Data Source is Working.',
    date: new Date(),
  };

  res.status(200).send(data);
});

app.get('/options', (req, res) => {
  res.status(200).send('annotations/options endpoint is functional.');
});

app.get('/search', (req, res) => {
  res
    .status(200)
    .send('Python HTTP trigger function processing a search request.');
});

app.get('/annotations', (req, res) => {
  res
    .status(200)
    .send('Python HTTP trigger function processing an annotations request.');
});

app.get('/deployments', async (req, res) => {
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  if (owner && repo) {
    const deploymentData = await deployments(owner, repo);
    res.status(200).json(deploymentData);
  } else {
    res.status(400);
    res.send(
      'Error: Please pass both an owner (github org name) and repo (github repo name) as scopedVars from Grafana.'
    );
  }
});

const server = app.listen(3000, () =>
  console.log(`
Server ready at: http://localhost:3000`)
);
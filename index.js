import express from 'express';
import { collectDefaultMetrics, register, Counter } from 'prom-client';

collectDefaultMetrics();

const app = express();

const counter = new Counter({
  name: 'HelloRouteCount',
  help: 'metric_help',
});

app.get('/', (req, res) => {
  counter.inc();
  res.send('Hello Prom!')
})

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
    counter.inc();
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, '0.0.0.0');

console.log("hello world");
console.log("HI");
console.log("HI");
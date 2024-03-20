const express = require('express');
const fs = require("node:fs");

/**
 * GET
 * /api/check-current-status
 *
 * GET
 * /setting.html
 *
 * POST
 * /api/update-status
 */

const app = express();

const currentState = {
  victim: 'victim',
  target: 'target',
}
app.use(express.json());

app.use((req, res, next) => {
  //fix content-type issue
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/api/check-current-status', (req, res) => {
  res.json(currentState);
})

app.post('/api/update-status', (req, res) => {
  currentState.victim = req.body.victim;
  currentState.target = req.body.target;
  res.json({success: true});
})

app.get('/setting', (req, res) => {
  const setting = fs.readFileSync('./setting.html', 'utf8');
  res.send(setting);
})

app.listen(3333, () => {
  console.log('Server is running on port 3333');
})


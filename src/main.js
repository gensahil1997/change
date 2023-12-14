// src/main.js
const core = require('@actions/core');

try {
  const message = core.getInput('message');
  console.log(`Changelog Action: ${message}`);
} catch (error) {
  core.setFailed(error.message);
}

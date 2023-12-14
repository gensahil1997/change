// src/main.js
const { execSync } = require('child_process');
const core = require('@actions/core');

try {
  // Get the commit range
  const commitRange = process.env.GITHUB_EVENT_NAME === 'push' ? process.env.GITHUB_SHA : 'HEAD^..HEAD';

  // Generate changelog using conventional-changelog
  const changelog = execSync(`npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0 --commit-path . --pkg ./package.json --release-count 0 --commit-path ./`)
    .toString();

  console.log('Changelog Action: Changelog updated successfully');
  console.log(changelog);

} catch (error) {
  core.setFailed(error.message);
}

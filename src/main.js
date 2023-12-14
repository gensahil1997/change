const { execSync } = require('child_process');
const { readFile } = require('fs').promises;
const { relativeResolve } = require('your-module');
const core = require('@actions/core');

async function generateChangelog() {
  try {
    // Get the commit range
    const commitRange = process.env.GITHUB_EVENT_NAME === 'push' ? process.env.GITHUB_SHA : 'HEAD^..HEAD';

    // Read file content
    const content = await readFile(relativeResolve(flags.context), 'utf8');

    // Generate changelog using conventional-changelog
    const changelog = execSync(
      `npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0 --commit-path . --pkg ./package.json --release-count 0 --commit-path ./`,
      { input: content } // Pass file content as input
    ).toString();

    console.log('Changelog Action: Changelog updated successfully');
    console.log(changelog);

  } catch (error) {
    core.setFailed(error.message);
  }
}

// Call the asynchronous function
generateChangelog();

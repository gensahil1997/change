const { execSync } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get the commit range
    const commitRange = process.env.GITHUB_EVENT_NAME === 'push' ? process.env.GITHUB_SHA : 'HEAD^..HEAD';

    // Generate changelog using conventional-changelog
    const changelog = execSync(`npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0 --commit-path . --pkg ./package.json --release-count 0 --commit-path ./`)
      .toString();

    console.log('Changelog Action: Changelog updated successfully');
    console.log(changelog);

    // Get inputs from the workflow
    const prNumber = core.getInput('pr-number');

    // Create a GitHub client
    const octokit = github.getOctokit(core.getInput('github-token'));

    // Comment on the pull request with the generated changelog
    await octokit.rest.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      body: `**Changelog**\n\n${changelog}`,
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

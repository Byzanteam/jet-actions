import * as core from '@actions/core'
import * as github from '@actions/github'
import NetlifyAPI from 'netlify'
import * as path from 'path'

async function getOrCreateSite(
  netlifyClient: InstanceType<typeof NetlifyAPI>,
  siteName: string,
  accountSlug: string
): Promise<{id: string}> {
  let site

  const sites = await netlifyClient.listSitesForAccount({
    // eslint-disable-next-line @typescript-eslint/camelcase
    account_slug: accountSlug,
    name: siteName
  })

  site = sites.find((element: {name: string}) => element.name === siteName)

  if (!site) {
    site = await netlifyClient.createSite({
      body: {
        name: siteName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_slug: accountSlug
      }
    })
  }

  return site
}

async function run(): Promise<void> {
  try {
    const netlifyClient = new NetlifyAPI(
      core.getInput('netlify-auth', {required: true})
    )

    // Get or Create a site
    const site = await getOrCreateSite(
      netlifyClient,
      core.getInput('netlify-site-name', {required: true}),
      core.getInput('netlify-account-slug', {required: true})
    )

    // Resolve publish directory
    const deployFolder = path.resolve(
      process.cwd(),
      core.getInput('netlify-dir', {required: true})
    )

    // Deploy to Netlify
    const deploy = netlifyClient.deploy(site.id, deployFolder, {
      draft: false
    })

    // Create a message
    const message = `🚀 Deployed on ${deploy.deploy.ssl_url}`
    // Print the URL
    core.info(message)

    // Set the deploy URL to outputs for GitHub Actions
    core.setOutput('deploy-url', deploy.deploy.ssl_url)

    // Add comment to pull request
    const prNumber = getPrNumber()
    if (prNumber) {
      const octokit = github.getOctokit(
        core.getInput('github-token', {required: true})
      )

      await commentOnPullRequest(octokit, prNumber, message)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return undefined
  }

  return pullRequest.number
}

async function commentOnPullRequest(
  octokit: ReturnType<typeof github.getOctokit>,
  prNumber: number,
  message: string
): Promise<void> {
  await octokit.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: prNumber,
    body: message
  })
}

run()
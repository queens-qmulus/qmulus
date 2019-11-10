# Contributing to Qmulus
Please refer to this guide for making direct contributions to the Qmulus API service.

## How Can I Contribute?
- The easiest way to contribute to Qmulus is to file any bugs or feature requests you have in [this repo's issue tracker](https://github.com/queens-qmulus/qmulus/issues)
- Fixing bugs or improving documentation. Take a look [the issue tracker](https://github.com/queens-qmulus/qmulus/issues) for any open bugs or tasks

### Adding a new endpoint for one of the existing datasets
Adding or updating endpoints that use the existing datasets should be fairly simple. The Node service is a straightforward express web application that serves data from a MongoDB database.

Feel free to open PRs if you think an existing dataset could benefit from an additional endpoint.

### Adding a new dataset
To get a technical overview of the entire system and to understand how the API service and data scrapers work together, refer to this [system overview diagram](https://docs.google.com/drawings/d/1jeoJlOxrmR5KwAhRTvgbgjOKE1ElvsWg4Mh15_480-o/edit?usp=sharing) and [the original technical design doc](https://docs.google.com/document/d/1mSzL61QNuoLRUKFjVgBNZ3OXuvTTt8ZQlr1hROU5qTE).

Qmulus consists of a Node API service and a set of data scraper modules that create JSON datasets from various Queen's University sources. Adding an endpoint to the API service may require a new scraper module to be added to [qu-scrapers](https://github.com/queens-qmulus/qu-scrapers). Refer to the [Scrapers Readme](https://github.com/queens-qmulus/qu-scrapers) for technical details about the data scraping scripts.

## Making Your First Contribution
First, fork and clone this repo. 

### Running Qmulus Locally
Make sure you have node version 10.6.x and npm version 6.x installed. We recommend using [nvm](https://github.com/nvm-sh/nvm) to install the proper node version.

You'll also need to install mongodb.
```
$ git clone <your forked repo url>
$ cd qmulus
$ npm install
$ npm run dev
```
The last command will start a dev server at localhost:3000. The dev server should restart automaticall when you make code changes.

#### env config
Qmulus uses environment variables for configuration. To use custom env variables while running locally, create a `.env` file in the root of the repo (this will/should not get commited to the repo).

When running locally, Qmulus will connect to your mongodb at `mongodb://localhost:27017/qmulus` but you can specify your own mongo connection using the `QMULUS_MONGO_URI` env varible.

#### Qmulus Management Service
When running locally, you can ignore any errors you see regarding the API tokens or the Qmulus management service. Qmulus uses a seperate service to administer API tokens and account sign up.

If you want to run locally with the Qmulus Management service, you can set `QMULUS_MANAGEMENT_URL="https://manage.qmulus.io"` in your `.env` file. This will require you to pass an API token to any API requests.

### Make Your Changes
- If your change requires a new dataset that needs a corresponding scraper module:
  - Add the scraper module changes first, we will not accept API service endpoint changes until we can verify that the scraper runs reliably and produces valid data
  - Once your scraper changes are live and the dataset is in storage, follow the rest of this guide
- If you are adding a new endpoint/updating an existing endpoint:
  - Update the [apidoc](http://apidocjs.com/) JSDoc inline documentation
    - If you update any doc comments, run `npm run docs` to re-generate the static documentation (add these changes to the same PR)
  - Add a new API endpoint test, see [this test file](https://github.com/queens-qmulus/qmulus/blob/develop/test/textbooks/textbooks.test.js) for examples

### Open a Pull Request
When your changes are ready, open a PR against the `develop` branch. Some things to keep in mind:
- Make sure your branch is up to date (rebase your branch against `develop` or merge `develop` into your branch). This way our checks will run against the latest changes.
- Github will run several checks against your branch:
  - [Javascript Standard style](https://standardjs.com) linting (install eslint locally to make your life easier)
  - The existing test suite and any new tests you add
- Add any Github issue numbers that were resolved in the PR description
- Your changes will be auto deployed and a deployment link will be added to your PR by the Heroku deployment service. You should test your changes against the deployed version.
- Add one of the project maintainers to your PR, we'll aim to review your PR within one day

## Seeing Your Changes Live
Once a PR is merged, it will automatically be deployed to [http://api-staging.qmulus.io](http://api-staging.qmulus.io) (as long as all tests and checks pass). This should happen within a couple minutes.

Currently, there is no schedule for production deployments but your changes will likely be deployed within the week.


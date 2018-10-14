# Description

This is a toy application built as a [technical challenge](docs/description.pdf) offered by Ensembl. The app searches for gene transcripts that encode proteins with a certain amino acid at a certain position using Ensembl REST API endpoints.

To view the online demo, visit https://azangru.github.io/ensembl-challenge/

## Running the app locally

To run the application locally:

- install Node (preferably the latest LTS, but any reasonably fresh version will do)
- run `npm install` to install the dependencies
- run `npm start` to start the app in development mode, or `npm run build && npm run serve-build` to start the app in production mode
- open the browser and navigate to `localhost:3000` to see the app running

_(the development build has webpack running in watch mode, and rebuilds every time the source code changes; the production build is minified and gzipped, and served locally by `http-server`)_

To run the test suite:

- run `npm test` (or `npm run tdd` to run the tests in the watch mode).

## Test input

Querying for Valine at position 600 of the BRAF gene (or for the ENSP00000419060.2:p.Val600Glu substitution) will return transcripts ENST00000496384 and ENST00000646891.

Querying for Valine at position 120 of the BRAF gene (or for the ENSP00000419060.2:p.Val120Glu substitution) will return transcripts ENST00000496384, ENST00000644969, ENST00000646891, ENST00000642228, ENST00000288602, ENST00000646730, ENST00000497784, and ENST00000469930.

## Further documentation

- [Understanding the task](docs/understanding-task.md) — a detailed explanation of what the app is trying to do.
- [Tech stack](docs/tech-stack.md) — overview of technologies used to build the app, and the rationale behind the technical choices
- [Code structure](docs/code-overview.md) — overview of the organization of the app

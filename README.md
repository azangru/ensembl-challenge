This is a toy application built as a [technical challenge](docs/description.pdf) offered by Ensembl. The app searches for gene transcripts that encode proteins with a certain amino acid at a certain position using Ensembl REST API endpoints.

To run the application locally:
- install Node (e.g. the latest LTS)
- cd into the project folder and run `npm install`
- run `npm start` to start the app in development mode, or `npm run build && npm run serve-build` to start the app in production mode
- open the browser and navigate to `localhost:3000` to see the app running

_(the development build has webpack running in watch mode, and rebuilds every time the code changes; the production build is minified and gzipped and served locally by `http-server`)_

Further relevant documentation:

- [Understanding the task](docs/understanding-task.md) — a detailed explanation of what the app is trying to do.
- [Tech stack](docs/tech-stack.md) — overview of technologies used to build the app, and the rationale behind the technical choices
- [Code structure](docs/code-overview.md) — overview of the organization of the app

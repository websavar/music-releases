# Discogs App 
- [Goal](#goal)
- [User Stories](#user-stories)
- [Dependencies](#dependencies)
- [API](#api)
- [Setup and Run](#setup-run)

>> [Online preview]()

<a name="#goal"></a>
## Goal
Build a single-page app that displays music releases from Discogs with React.

<a name="#user-stories"></a>
## User Stories
- Display list of music releases. You can use the Discogs [API](#api)
to achieve this (you’ll need to sign up for a developer token).
- Include a search box that allows the user to search for specific terms
(e.g. searching for “moderat” should return releases relating to the band Moderat).
- As a further option, the app could be :
-- Responsive
-- Accessible
-- Paginated
-- Progressively enhanced
-- Deployed somewhere e.g. AWS or Heroku
-- Perform well over slow internet connections
-- Work offline

<a name="#dependencies"></a>
## Dependencies
- [Bootstrap](https://getbootstrap.com/): To design and customize responsive mobile-first sites (version 5).
- [axios](https://github.com/axios/axios): A promise-based HTTP Client for node.js and the browser.
- [node-sass](https://www.npmjs.com/package/node-sass): Allows you to natively compile `.scss` files to `css`.
- [react-router-hash-link](https://www.npmjs.com/package/react-router-hash-link): A solution to React Router's issue of not scrolling to `#hash-fragments` when using the `<Link>` component to navigate.

<a name="#api"></a>
## API
- Discogs: https://www.discogs.com
- Discogs API (see in particular the sections on Authentication and Search):
https://www.discogs.com/developers
- API token generation (requires account): https://www.discogs.com/settings/developers

<a name="#setup-run"></a>
## Setup and run
1. Run `npm install` to install required dependencies
2. Run `npm run start` to run the project and Open http://localhost:3000

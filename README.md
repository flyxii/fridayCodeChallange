# Friday coding challenge

### Languages
React 17.0.2
Typescript 4.3.2

### Setup
Run the following command to start the api server:

```sh
node apiserver/server.js
```

Run the following command to start the development server locally:

```sh
npm install
npm start
```

Open http://localhost:3000 to view it in the browser.

### Technical Notes
1. Incorporated swr for fetching and caching the data return from the api server. Since the server is not stable, swr help for refectching if the api call is not success.
2. Incorporated typescript for type checking.
3. Used the useContext hook for state management.

### Further Improvement
1. Could store the query in localStorage to persist the status if user revisit the application.

### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


##### `npm test`

Launches the test runner in the interactive watch mode.

##### `npm run build`

Builds the app for production to the `build` folder.\

##### `npm run eject`

Eject the react bundle

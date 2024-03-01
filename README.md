# CS5/7328 TA-system project
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


For SMU software engineering, this is a template for frontend development.

Author: [Junhao Shen](junhaos@smu.edu)
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Project Structure
```
├── jest.config.js
├── LICENSE
├── LICENSE.txt
├── package.json
├── package-lock.json
├── Procfile
├── public                                  # Public folder, put your static files under this folder
├── README.md
├── src
│   ├── App.tsx
│   ├── components
│   ├── config.ts
│   ├── index.tsx
│   ├── pages                               # add your pages here
│   │   ├── application
│   │   ├── faculty-jobs
│   │   ├── HomeDefault.tsx
│   │   ├── Home.tsx
│   │   ├── JobInfo.tsx
│   │   ├── login
│   │   ├── MockResume.tsx
│   │   ├── TAIndividualJobDisplay.tsx
│   │   ├── TAJobDisplayComponent.tsx
│   │   └── user
│   ├── provider.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── services                            # Services folder, write function to handle communication between frontend and backend
│   │   ├── apply.ts
│   │   ├── auth.ts
│   │   ├── faculty-job.ts
│   │   └── tajob.ts
│   ├── setupTests.ts
│   ├── stylesheets             
│   └── __test__
│       ├── App.test.tsx
│       └── LoginPage.test.tsx
├── tsconfig.json
└── yarn.lock
```


## Recommended VSCode extensions:
- ESLint or Prettier ESLint
- GitLens
# React frontend template
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
├── LICENSE.txt
├── package.json
├── package-lock.json
├── public                                  # Public folder, put your static files under this folder
├── README.md
├── src                                     # Source files, write your code under this folder
│   ├── App.tsx
│   ├── config.ts
│   ├── index.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── login
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegistrationPage.tsx
│   │   └── userProfile
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── services                            # Services folder, write your services under this folder
│   │   └── auth.ts
│   ├── setupTests.ts
│   ├── stylesheets
│   │   ├── App.css
│   │   └── index.css
│   └── __test__                            # Test folder, write your test case under this folder
│       └── App.test.tsx
└── tsconfig.json
```
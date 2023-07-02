# MERN Social Media Application

![MERN Stack](https://img.shields.io/badge/Tech_Stack-MERN-blue)
![Build Status](https://img.shields.io/badge/Build-Passing-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Contributors](https://img.shields.io/badge/Contributors-4-blue)
![Semantic Versioning](https://img.shields.io/badge/Semantic_Versioning-2.0.0-blueviolet)
![GitHub Flow](https://img.shields.io/badge/GitHub_Flow-Active-brightgreen)
![Changelog](https://img.shields.io/badge/Changelog-Keep_a_Changelog-red)
![TODO.md](https://img.shields.io/badge/TODO.md-Active-yellow)

## Overview

This app is made with:

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.nodejs.com)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://www.nodejs.com)
[![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://www.mui.com)
[![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org)

Our development environment backend includes SQLite instead of MongoDB for development purposes only.

This app was bootstrapped with Create-React-App v5 aka react-scripts by running `npx create-react-app reactsocialmedia`

This is a full stack MERN social media application that allows users to create and share posts, join and also create events and groups. Our main core focus is on friends, groups and events.

This design is based on community driven developent and as such there is no particular design we are going for just yet.  We have a reusable component called Panel to make contributing new components and features easier.  You should be able to easily submit a design that will work with the design we
have already started working with.  If we like the design of the component, feature, panel or other item, we will merge it if the item has been tested as working.

## Features

- Groups
- Events
- Connecting with friends

## Installation

To install and run this application, you will need to have Node.js and MongoDB installed on your machine. Once you have these installed, follow these steps:

1. Clone the repository
2. move to /client folder using `cd client` on your terminal
3. Install the dependencies using `npm install`
4. Start the server using `npm start`
5. Open the application in your web browser at `http://localhost:3000`

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive commit messages and include a screenshot of your working change.
4. Push your changes to your fork
5. Submit a pull request

If you would like to contribute to this repository, please read our [Contributing](https://github.com/gbowne1/reactsocialnetwork/blob/main/docs/CONTRIBUTING.md) document. We welcome your pull requests here. We are editor and IDE agnostic here, however, VSCode and Visual Studio configurations and settings are included to make contributing easier for those who have not set up their development environment for React development.  This includes extensions which you can opt out of installing when you first open the project in VSCode.

You should already be familiar with React 17 and or 18, JavaScript ES5/ES6/ES7 and JSX. If you are not there are plenty of resources available, such as this video: <https://www.youtube.com/watch?v=cd3P3yXyx30>

This is not hosted anywhere yet and the backend of this project is currently under construction.

If you would like something to work on, there are plenty of TODO's here <https://github.com/gbowne1/reactsocialnetwork/blob/main/docs/TODO.md> we are particularly needing help with core features.  If you have ideas for features, use the discussion tab to submit an idea for a feature.

## Contact

If you have any questions or concerns about this project, please contact the project maintainers and the current core development team.  These are the people you will add as reviewers on a PR.

@manuel12 @pawel975 @gbowne1

## Testing

We have both unit tests(Jest & React Testing Library) and e2e tests(Cypress).


In order to run unit tests go to `client/` folder and run `npm run test` on the CLI.

In order to run e2e tests go to `client/` folder and run `npm run test:cypress` on the CLI.

In order to open cypress UI go to `client/` folder and run `npm run test:cypress:open` on the CLI.

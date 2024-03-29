## Life Dashboard

![license](https://img.shields.io/badge/license-MIT-blue.svg)

## Purpose

The purpose of this application is to build a one stop shop for all your life tracking needs. Current features supported are:

- Main dashboard dispaying key information of other features
- Bank account balances tracking income and expenses (including credit cards)
- Savings balances while being split into savings buckets
- Car and home loans progress
- Insurance claims and deductable progress
- HSA transaction tracking

## Firebase Function

- Function are located in `functions/index.js`

- Functions are deployed to firebase through `firebase deploy --only functions` or `npm run function`

- Ending Balance function: This function is triggered by a change in the months spent amount. It will update the ending balance for the month that the update was selected. Notes: Front end app only allows spent value update for the current month and one before.

## Firebase Realtime Database

TBD

## Firebase Authentication

The app currently supports authentication through email and google. All being handleded by firebase.

## Vercel Deployment

The app automatically deploys to vercel when a change is pushed to main branch.

## Quick start

- Clone the repo: `git clone https://github.com/howdy10/LifeDashboard`

- Make sure your NodeJS and npm versions are up to date for `React 17`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

- Log in with test account

## Refrences

This Dashboard is using [MUI's](https://mui.com/?ref=devias-io) components, [React](https://reactjs.org/?ref=devias-io) and [Next.js](https://github.com/vercel/next.js/?ref=devias-io)

This project was started with a free template provided by [Devias](https://devias.io>).
Which can be found [here](https://github.com/devias-io/material-kit-react).

This project is being deployed to [vercel](https://vercel.com/)

This project uses [Firebase Realtime Database](https://firebase.google.com/docs/database)

## Table readme example

We also have a pro version of this product which bundles even more pages and components if you want to save more time and design efforts :)

| Free Version (this one) | [Material Kit Pro - React](https://material-ui.com/store/items/devias-kit-pro/) |
| ----------------------- | :------------------------------------------------------------------------------ |
| **7** Demo Pages        | **40+** demo pages                                                              |
| -                       | ✔ Dark & light mode                                                             |
| -                       | ✔ Authentication with \*Amplify**, **Auth0**, **JWT** and **Firebase\*\*        |
| -                       | ✔ TypeScript version - for Standard Plus and Extended license                   |
| -                       | ✔ Design files (sketch & figma) - for Standard Plus and Extended license        |
| -                       | ✔ Complete users flows                                                          |

## Readme sub text eample

> Free React Admin Dashboard made with [MUI's](https://mui.com/?ref=devias-io) components, [React](https://reactjs.org/?ref=devias-io) and of course [Next.js](https://github.com/vercel/next.js/?ref=devias-io) to boost your app development process!

# Simple CRUD Application with React.js and JSON Server

This project is a simple CRUD (Create, Read, Update, Delete) application built using React.js for the front end and JSON Server for the back end. The goal of this project is to demonstrate the use of various React hooks, including `useState`, `useEffect`, and custom hooks. Additionally, a context has been created to manage the state of the application at the root level (in `App.js`), allowing for the sharing of custom hooks and state management across components.

## Features

- **Create**: Add new products to the database.
- **Read**: View a list of products, search for products, and navigate through paginated results.
- **Update**: Edit product details.
- **Delete**: Remove products from the database.

## Project Structure

- **FrontEnd**: The front end is built with React.js and utilizes Bootstrap for styling.
- **BackEnd**: The back end uses JSON Server to provide a simple RESTful API for managing products.

## Available Scripts

In the project directory, you can use the following scripts:

### `npm start`

This script runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### `json-server -w data/db.json -p 9000`

Use this command to launch the JSON Server for the back end. It provides endpoints for managing products.

## Custom Hooks and Context

The project demonstrates the use of custom hooks, such as `useAppState`, for managing the global state of the application. The global state is accessible through a context, allowing multiple components to share and modify this state as needed.

## How to Use

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Start the JSON Server with `json-server -w data/db.json -p 9000`.
5. Start the React application with `npm start`.
6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to use the CRUD application.

Feel free to modify and extend this project to suit your needs. Enjoy building with React!

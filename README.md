# Schedulock Project

## Overview

This project is a scheduling application built with React, Node.js, and MongoDB. It utilizes various libraries and frameworks, including Vite, Express, and Tailwind CSS.

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

### Steps

1.  Clone the repository: `git clone https://github.com/dimaliwatkent/schedulock-test.git`
1.  Navigate to the project directory: `cd schedulock-test`
1.  Install dependencies: `npm install`
1.  Rename the example environment file: `.env.example` to `.env`
1.  Update the environment file with your own values: Replace `xxxxxx` with the correct values in the `.env` file.
1.  Start the client development server: `npm run dev`
    - Access the client at: `http://localhost:5173`
1.  Start the server: `npm start`
    - Access the server at: `http://localhost:3000/.netlify/functions/api/`
1.  Make sure BOTH client host and server host are running.

### Project Structure

The project is divided into two main parts:

- Client: Built with React, Vite, and Tailwind CSS.
- Server: Built with Node.js, Express, and MongoDB.

### Dependencies

The project uses the following dependencies:

#### Client:

- React
- Vite
- Tailwind CSS
- Radix UI
- Shadcn UI
- Axios

#### Server:

- Node.js
- Express
- MongoDB
- Mongoose
- Cors
- Helmet
- Morgan

### Scripts

The project includes the following scripts:

- **dev**: Starts the client development server with Vite.
- **build**: Builds the client with Vite and TypeScript.
- **lint**: Runs ESLint on the project.
- **preview**: Starts the client preview server with Vite.
- **start**: Starts the server with nodemon.

### Environment Variables

The project uses environment variables to store sensitive information. Make sure to update the `.env` file with your own values.

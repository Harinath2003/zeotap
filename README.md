# Rule Engine - Node.js, MySQL, Express

## Project Overview
This project implements a rule engine using Node.js and MySQL. Users can define custom rules in the form of strings, which are parsed into an Abstract Syntax Tree (AST). These rules are stored in the database and can be evaluated against input data via API endpoints.

The project includes:
- **Rule Creation**: Users can create rules and store them in the database.
- **Rule Evaluation**: Evaluate the stored rules against given data.

## Design Choices
- **Node.js**: Chosen for its non-blocking I/O model, making it ideal for building fast and scalable network applications.
- **Express.js**: A lightweight and unopinionated framework for building web APIs.
- **MySQL**: Selected for its relational data structure, which fits the rule and AST storage model.
- **AST Representation**: Used to represent the rules for better flexibility and extensibility.
- **Frontend**: A simple HTML, CSS, and JavaScript-based UI for interacting with the API.

## Dependencies
To set up and run the project, you will need the following dependencies:
- **Node.js**: v16.x or later [Install Node.js](https://nodejs.org/)
- **MySQL**: v5.7 or later [Install MySQL](https://dev.mysql.com/downloads/)
- **dotenv**: v16.x or later
- **express**: v4.x or later
- **body-parser**: v1.x or later
- **mysql2**: v2.x or later
- **cors**: v2.x or later

## Prerequisites
Ensure you have the following installed:
1. **Node.js**: Install [here](https://nodejs.org/).
2. **MySQL**: You can either use a local MySQL setup or opt for containerized solutions like Docker or Podman.
3. **.env File**: Create a `.env` file based on `.env.example`:

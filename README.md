# Project Management App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authentication](#authentication)
6. [Roles](#roles)

## Introduction

This Node.js and Express.js-based Project Management App provides a set of APIs for managing personal projects. The app allows users to register, authenticate, and perform CRUD operations on their projects and tasks within those projects. MongoDB is used as the database, and two user roles ('admin' and 'user') are supported.

## Features

- **User Registration:** Users can register with the app to create an account.
- **Authentication:** Secure user authentication is implemented to protect user accounts and data.
- **Project CRUD:** Create, read, update, and delete projects.
- **Task Management:** Within each project, users can create, update, and mark tasks as completed.
- **Roles:** Supports two user roles - 'admin' and 'user'.
- **API-Driven:** The app is designed with a RESTful API architecture for easy integration and scalability.

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ayushjha090/Project_Management_App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-management-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your MongoDB database and update the configuration files accordingly.

5. Run the app:

   ```bash
   npm start
   ```

6. The app will be accessible at http://localhost:{port}.

## Usage

Once the app is running, users can interact with the API to manage their projects and tasks.

## Authentication

Authentication is required for most API endpoints. Users need to obtain an access token by registering and logging in. Include the access token in the headers of API requests for secure access.

## Roles

The app supports two user roles:

- **admin:** Users with admin privileges have additional capabilities, such as managing other users' projects.
- **user:** Regular users can manage their own projects and tasks.

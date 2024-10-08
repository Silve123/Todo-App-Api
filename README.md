# Todo App API

This is a Node.js API built for the Todo App, which uses Firebase for authentication and Firestore to store todos. The API communicates with the React front end to handle CRUD operations for todos.

## Features
- Firebase Authentication for user management
- Firestore integration for storing and retrieving todos
- RESTful API for handling CRUD operations

## Prerequisites
Before running the API, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- A Firebase project with Firestore enabled

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Silve123/Todo-App-Api.git
cd todo-api
```

### 2. Install dependencies
```bash
npm install
```
### 3. Firebase Setup
Create a Firebase project at Firebase Console.
Enable Firestore in the Firebase console.
Download your Firebase Service Account JSON file from Firebase Console and place it in the root of your project as firebaseServiceAccount.json.
### 4. Environment Variables
Create a .env file in the root of your project and add your Firebase project ID:

```bash
FIREBASE_PROJECT_ID=your-project-id
```
### 5. Run the Server
bash
Copy code
node server.js
The API should now be running on http://localhost:3000.

API Endpoints
Authentication
POST /login – Authenticates a user with Firebase
Todos
GET /todos – Retrieve all todos for a user
POST /todos – Add a new todo
PUT /todos/
– Update a todo
DELETE /todos/
– Delete a todo
Project Structure
```bash
├── firebaseServiceAccount.json  # Firebase service account credentials
├── server.js                    # The API server file
├── package.json                 # Project metadata and dependencies
└── .env                         # Environment variables
```
Technologies Used
Node.js
Express
Firebase Admin SDK
Firestore
Contributing
Feel free to submit a pull request or open an issue if you have suggestions or find bugs.

```css
This version ensures that all steps, including code blocks, are properly formatted in Markdown. Let me know if this works!
```

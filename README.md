# notes-app

<br>
This is a simple note-keeping web application built using React on the frontend and an Express.js server with a Prisma-powered SQLite database on the backend.
<br>

# Features

Create, read, update, and delete notes.

Save notes with a title and content.

Edit existing notes or add new ones.

User-friendly interface for managing your notes.

# Installation

To run this project locally, follow these steps:
<br>
<br>
**Frontend (React)**
Run the following commands:

```
git clone https://github.com/dimicodes/notes-app.git

cd <enter/pathto/notes-app-ui/location>

npm install

npm start

```

The app will be available at http://localhost:3000
<br>
<br>
**Backend (Express.js and Prisma)**

Run the following commands:

```
cd <enter/pathto/notes-app-server/location>

npm install

npm start
```

The server will be available at http://localhost:5001

Ensure you have Prisma installed globally:

```
npm install -g prisma
```

Apply database migrations:

```
prisma db push
```

# Usage

Visit http://localhost:3000 to access the NoteKeeper web app.

Create, edit, and delete notes as needed.

Your notes are automatically saved to the backend server.

# API Endpoints

GET /api/notes: Get a list of all notes.

POST /api/notes: Create a new note.

PUT /api/notes/:id: Update an existing note by ID.

DELETE /api/notes/:id: Delete a note by ID.

# Technologies Used

React

Express.js

Prisma

SQLite

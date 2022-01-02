
// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteList = require('./db/db.json');
// server setup
const PORT = process.env.PORT || 3001;
const app = express();
// express data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

// html routes and get/post requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(noteList);
});

app.post("/api/notes", (req, res) => {
    req.body.id = noteList.length.toString();
    const newNote = req.body;
    createNewNote(newNote, noteList);
    res.json(newNote);
});

// function to add new note to list
function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteList, null, 2));
}



// listen for connections
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
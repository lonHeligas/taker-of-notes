const express =require('express');
const PORT = process.env.port || 3001;
const app = express();
const path = require('path');


// todo GET html route for /notes (returns the notes.html file)
// todo GET html route for * (should return the index.html file)

// todo GET API route for /api/notes should read the db.json file and return all saved notes as JSON
// todo POST /api/notes should receive a new note to save on the request body, add it to the db.jason file, and then return the new note to the client. Figure out a way to give each note a unique id when it's saved (look into Nnpm packages that could do this for you) That should be uuid that does that?


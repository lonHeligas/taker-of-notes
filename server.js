const express =require('express');
const PORT = process.env.port || 3001;
const app = express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const fs = require('fs');


app.use(express.json());
app.use(express.static('public'));




// todo GET html route for /notes (returns the notes.html file)
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {  
  const stringData = fs.readFileSync('./db/db.json');
  res.json(JSON.parse(stringData));
})
  // res.send("a word")

app.post('/api/notes', (req, res) => {

  // * console.log(req.body);
  const newNote = req.body;
  newNote.id = uuidv4();
  // * console.log(newNote);

  const dbData = JSON.parse(fs.readFileSync('./db/db.json'));


  // pushes the new note data into the database
  dbData.push(newNote);
  // * console.log(dbData);
  
  // write the data to the json file
  fs.writeFileSync('./db/db.json', JSON.stringify(dbData , null , 2));
  res.send(newNote);
})


app.delete('/api/notes/:id', (req, res) => {

  const dbData = JSON.parse(fs.readFileSync('./db/db.json'));
  // console.log(req.params);
  
  const { id } = req.params;  
  
  const deleted = dbData.find(note => note.id === id);

  if (deleted) {

    console.log(deleted);

    const newDbData = dbData.filter(note => note.id != id)  
    fs.writeFileSync('./db/db.json', JSON.stringify(newDbData , null , 2));      
    res.status(200).json(deleted);
  } else {
    console.log(deleted);
    res
      .status(404)
      .json({ message: 'The record you are looking for does not exist'})
  }


  // console.log(`this is the delete route: ${res.id}`);

})



// * GET API route for /api/notes should read the db.json file and return all saved notes as JSON
// * POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Figure out a way to give each note a unique id when it's saved (look into Npm packages that could do this for you) That should be uuid that does that

// * receive the notes from the request body
// * assign an id
// * add it do the db.json file
// * return the new note to the client


// todo GET html route for * (should return the index.html file)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));


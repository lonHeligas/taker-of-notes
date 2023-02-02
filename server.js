const express =require('express');
const PORT = process.env.port || 3001;
const app = express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const fs = require('fs');


app.use(express.json());
app.use(express.static('public'));




// * GET html route for /notes (returns the notes.html file)

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {  
  const stringData = fs.readFileSync('./db/db.json');
  res.json(JSON.parse(stringData));
})
  

app.post('/api/notes', (req, res) => {

  // * console.log(req.body);
  const newNote = req.body;
  newNote.id = uuidv4();
  // * console.log(newNote);

  const dbData = JSON.parse(fs.readFileSync('./db/db.json'));


  // * pushes the new note data into the database
  dbData.push(newNote);
  // * console.log(dbData);
  
  // * write the data to the json file
  fs.writeFileSync('./db/db.json', JSON.stringify(dbData , null , 2));
  res.send(newNote);
})

// * deletes the note from the page once the user has clicked a notes's trash can icon
app.delete('/api/notes/:id', (req, res) => {

  const dbData = JSON.parse(fs.readFileSync('./db/db.json'));
  // console.log(req.params);
  
  const { id } = req.params;  
  
  const deleted = dbData.find(note => note.id === id);

  if (deleted) {

    // * console.log(deleted);

    const newDbData = dbData.filter(note => note.id != id)  
    fs.writeFileSync('./db/db.json', JSON.stringify(newDbData , null , 2));      
    res.status(200).json(deleted);
  } else {
    // * console.log(deleted);
    res
      .status(404)
      .json({ message: 'The record you are looking for does not exist'})
  }


  // console.log(`this is the delete route: ${res.id}`);

})



// * GET html route for * (should return the index.html file)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));


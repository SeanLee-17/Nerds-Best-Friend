const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.post('/', (req, res) => {
  const {title, text} = req.body;
  if (req.body) {
      const noteMaker = {
          title, 
          text,
          id: uuidv4(),
      }
      readAndAppend(noteMaker, "./db/db.json")
      res.json(`new note made`)
  } else {
      res.error('you messed up badly and its all your fault')
  }
});

// // DELETE Route for a specific tip
// notes.delete('/:tip_id', (req, res) => {
//   const tipId = req.params.tip_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all notes except the one with the ID provided in the URL
//       const result = json.filter((tip) => tip.tip_id !== tipId);

//       // Save that array to the filesystem
//       writeToFile('./db/notes.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${tipId} has been deleted 🗑️`);
//     });
// });

// POST Route for a new UX/UI tip


module.exports = notes;

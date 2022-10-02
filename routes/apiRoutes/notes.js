const router = require("express").Router();
const {findById, createNewNote, validateNote, deleteNote} = require("../../lib/notes");
const notes = require("../../data/db.json")

router.get('/notes', (req, res) => {
  console.log("GET route hit!");
  console.info(`${req.method} request was received to view all notes.`);
  const result = notes;
  if (result) {
      res.json(result);
  } else {
      res.sendStatus(400);
  }
});


router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  console.log("post route hit!");
  // log that a POST request was received
  console.info(`${req.method} request was received to add a note`);
  // Maybe validation is within the IF TITLE AND TEXT
  if (!validateNote(req.body)) {
    res.status(400).send("This note is not properly formatted.")
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// **** NOT WORKING!!!! ****  ... does this need to work? 
router.put("/notes:id", (req, res) => {
  console.log("PUT route hit!");
  console.info(`${req.method} request was received to edit a note`);
  const result = findById(req.params.id, notes);
  // if (!validateNote(req.body)) {
  //   res.status(400).send("This note is not properly formatted.")
  // } else {
    const note = editNote(req.body, notes);
    res.json(note);
  }
);


// ****  APP DELETE HERE *** 
// app.delete("/api/notes", (req, res) => {
//   res.send("DELETE Request Called")
// });

router.delete('/:text_id', (req, res, next) => {
    const id = req.params.id;
    Note.delete(id, (err) => {
      if (err) return next(err);
      res.send({ message: 'Deleted' });
    });
  });

// log that a POST request was received
// console.info(`${req.method} request was received to delete a note`);
// // destructuring assignment for items in req.body
// const { title, text, text_id } = req.body;
//   // If all the required properties are present
//   if (title || text || text-id) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       text_id: randomUUID()
//       };
// // Read the file, then re-write the file to put inside an array.
//     fs.readFile(`./Develop/db/db.json`, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err)
//       }else {
//         const parsedNote = JSON.parse(data)
//         parsedNote.push(newNote)
//         fs.writeFile(`./Develop/db/db.json`, JSON.stringify(parsedNote), (err)=> err ? console.error(err) : console.log('Note entered and ID created.'))
//       }
//     });
//       console.log(`${newNote.title} has been deleted.`);
//       const response = {
//         status: 'deleted',
//         body: newNote,
//         };
//       console.log(response);
//       res.json(response);
//       }
//     });

//   app.delete("/api/notes", (req, res) => {
//     // let results = notes;
//     // if (req.query) {
//     //   results =filterByQuery(req.query, results);
//     // }
// // });
//     // console.log(req.query);
//     res.json(notes);
//   });

module.exports = router;
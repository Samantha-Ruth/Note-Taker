const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const notes = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.text_id) {
    filteredResults = filteredResults.filter(notes => notes.text_id === query.text_id);
  }
  return filteredResults;
}

//****  TRYING TO FILTER BY QUERY IF ITEMS ARE IN ARRAY,
//****  BUT MIGHT NOT NEED **********
// function filterByQuery(query, notesArray) {
//   let textIDArray = [];
//   let filteredResults = notesArray;
//   if (query.text_id) {
//     if (typeof query.text_id === 'string') {
//       textIDArray = [query.text_id];
//     } else {
//       textIDArray = query.text_id;
//     }
//     textIDArray.forEach(id => {
//       filteredResults = filteredResults.filter(
//         notes => notes.text_id.indexOf(id) !==-1
//         );
//     });
//   }
//   return filteredResults;
// }

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

function findByID(text_id, notesArray) {
  const result = notesArray.filter(note => note.text_id === text_id)[0];
  return result;
};

app.get("/api/notes/:id", (req, res) => {
  const result = findByID(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}


function createNewNote(body, notesArray) {
  // destructuring assignment for items in req.body
  const { title, text } = body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      text_id: randomUUID()
    };
    // Read the file, then re-write the file to put inside an array.
    fs.readFile(`./Develop/db/db.json`, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        const parsedNote = JSON.parse(data)
        parsedNote.push(newNote)
        fs.writeFile(`./Develop/db/db.json`, JSON.stringify(parsedNote), (err) => err ? console.error(err) : console.log('Note entered and ID created.'))
      }
    });
    console.log(`${newNote.title} note has been written to JSON file`);
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    return(response);
  }
};


app.post("/api/notes", (req, res) => {
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

// ****  APP DELETE HERE *** 
// app.delete("/api/notes", (req, res) => {
//   res.send("DELETE Request Called")
// });

app.delete('/notes/:text_id', (req, res, next) => {
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

// *** Code catch all here *** 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
})


//**** End of Catch Code ****/

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});



const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


const notes = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/api/notes", (req, res) => {
    // let results = notes;
    // console.log(req.query);
    res.json(notes);
  });




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });



const fs = require("fs");
const path = require("path");

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

function findById(text_id, notesArray) {
    const result = notesArray.filter(note => note.text_id === text_id)[0];
    return result;
  };

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

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

// const printResults = resultArr => {
//     console.log(resultArr);
  
//     const animalHTML = resultArr.map(({ id, name, personalityTraits, species, diet }) => {
//       return `
//     <div class="col-12 col-md-5 mb-3">
//       <div class="card p-3" data-id=${id}>
//         <h4 class="text-primary">${name}</h4>
//         <p>Species: ${species.substring(0, 1).toUpperCase() + species.substring(1)}<br/>
//         Diet: ${diet.substring(0, 1).toUpperCase() + diet.substring(1)}<br/>
//         Personality Traits: ${personalityTraits
//           .map(trait => `${trait.substring(0, 1).toUpperCase() + trait.substring(1)}`)
//           .join(', ')}</p>
//       </div>
//     </div>
//       `;
//     });
  
//     $displayArea.innerHTML = animalHTML.join('');
//   };


const getNotes = (formData = {}) => {
    let queryUrl = '/api/notes?';
  
    Object.entries(formData).forEach(([key, value]) => {
      queryUrl += `${key}=${value}&`;
    });
  
    console.log(queryUrl);
  
    fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(noteData => {
      console.log(noteData);
      printResults(noteData);
    });
  };


//   const handleGetAnimalsSubmit = event => {
//     event.preventDefault();
//     const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
//     let diet;
  
//     for (let i = 0; i < dietRadioHTML.length; i += 1) {
//       if (dietRadioHTML[i].checked) {
//         diet = dietRadioHTML[i].value;
//       }
//     }
  
//     if (diet === undefined) {
//       diet = '';
//     }
  
//     const personalityTraitArr = [];
//     const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  
//     for (let i = 0; i < selectedTraits.length; i += 1) {
//       personalityTraitArr.push(selectedTraits[i].value);
//     }
  
//     const personalityTraits = personalityTraitArr.join(',');
  
//     const animalObject = { diet, personalityTraits };
  
//     getAnimals(animalObject);
//   };
  
//   $animalForm.addEventListener('submit', handleGetAnimalsSubmit);

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
  }
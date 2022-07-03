const fs = require("fs");
const { filterByQuery, findById, createNewNote, validateNote, } = require("../lib/notes");
const { notes } = require("../data/db.json");

jest.mock('fs');
test("creates a notes object", () => {
    const note = createNewNote(
        { title: "Note_Test_1", text: "Note_Test_one", text_id: "987g6" },
        notes
      );

    expect(note.title).toBe("Note_Test_1");
    expect(note.text).toBe("Note_Test_one");
});

test("Filters notes by Query", () => {
    const startingNotes =  [
        {
          title: "To_Do",
          text: "Figure this out better",
          text_id: "5",
        },
        {
            title: "To_Do_2",
            text: "Delete this text",
            text_id: "7",
        },
      ];

    const updatedNotes = filterByQuery({ text_id: 7 }, startingNotes);

    expect(updatedNotes.length).toEqual(1);
});

test("Finds by ID", () => {
    const startingNotes =  [
        {
          title: "To_Do",
          text: "Figure this out better",
          text_id: "5",
        },
        {
            title: "To_Do_2",
            text: "Delete this text",
            text_id: "7",
        },
      ];

    const result = findById("7", startingNotes);

    expect(result.name).toBe("To_Do_2");
});

test("Validates Note", () => {
    const note =
        {
          title: "To_Do_4",
          text: "Does this validate the note?",
          text_id: "5",
        }

    const invalidNote = 
        {
            title: "To_Do_4",
            text: "Does this validate the note?",
            text_id: 5,
        };
    
        const result = validateNote(note);
        const result2 = validateNote(invalidNote);

        expect(result).toBe(true);
        expect(result2).toBe(false);
});
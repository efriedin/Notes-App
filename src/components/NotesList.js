import Note from "./Note";
import AddNote from "./AddNote";

// Component responsible for rendering the list of notes
const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleUpdateNote, }) => {

  console.log('Notes: ', notes);
  
  if (notes.length === 0) {
    return <p>No Notes available</p>
  }

  return (
    <div className="notes-list">
      {/* Iterate over notes array and render a Note component for each note */}
      {notes.map((note) => (
        <Note
          key={note.id} //unique id for each note
          note={note}
          handleDeleteNote={handleDeleteNote} // function to delete the note
          handleUpdateNote={handleUpdateNote}

        />
      ))}
      {/* Render the AddNote component to allow adding new notes*/}
      <AddNote
        handleAddNote={handleAddNote} //function to add a new note
      />
    </div>
  );
};

export default NotesList;

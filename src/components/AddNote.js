import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState(''); //State for the note text
  const characterLimit = 200; // Maximum character limit for a note

  //Event handler for the textarea change
  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value); //Update the note text state
    }
  };


  //Event handler for the save button click
  const handleSaveClick = (event) => {
    event.preventDefault();
    if (noteText.trim().length > 0) {
      handleAddNote(noteText); // Pass the note text directly to handleAddNote
      setNoteText(''); //Clear the note text state after saving 
    }
  };
  

  return (
    <div className="note new">
      <textarea
        rows='8'
        cols='10'
        placeholder="Type to add a note.."
        value={noteText} //Bind the note text state tot he textarea value
        onChange={handleChange} // Register the onChange event to update the note text state
      ></textarea>
      <div className="note-footer">
        <small>
          {characterLimit - noteText.length} Remaining
        </small>
        {/* Save button for saving the new note */}
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;


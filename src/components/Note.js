import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const Note = ({ note, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(note.text);

  const handleInputChange = (event) => {
    setTempText(event.target.value);
  };

  const handleSaveNote = () => {
    console.log(tempText);
    if(tempText !== "") {
      handleUpdateNote({
        ...note,
        text: tempText,
      });
      setIsEditing(false);
    }
  };

  const handleNoteClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setTempText(note.text);
  }, [note.text]);


  return (
    <div className="note">
      {isEditing ? (
        <>
          <textarea
            rows="8"
            cols="10"
            type="text"
            value={tempText}
            onChange={handleInputChange}
            className="edit-text-area"
          ></textarea>
          <button onClick={handleSaveNote} className="update-note">Update Note</button>
        </>
      ) : (
        <span onClick={handleNoteClick}>{note.text}</span>
      )}
      <div className="note-footer">
        {/* Display the note date*/}
        <small>{note.date}</small>
        <MdEditNote onClick={handleNoteClick} className="edit-icon" />
        {/* Delete icon for deleting the note*/}
        <MdDeleteForever
          onClick={() => handleDeleteNote(note.id)}
          className="delete-icon"
          size="1.3em"
        />{" "}
      </div>
    </div>
  );
};

export default Note;

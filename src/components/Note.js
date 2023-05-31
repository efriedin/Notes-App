import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);
  const [tempText, setTempText] = useState(text);

  const handleInputChange = (event) => {
    setTempText(event.target.value);
  };

  const handleSaveNote = () => {
    if(tempText.text() !== "") {
      handleUpdateNote({
        id,
        text:tempText,
        date,
      });
      setIsEditing(false);
    }
  };

  const editNote = () => {
    handleUpdateNote({
      id,
      text: updatedText,
      date,
    });
  };

  const handleNoteClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (tempText.trim() !== "") {
      handleSaveNote({
        id,
        text: tempText,
        date,
      });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setTempText(text)
  }, [text]);

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={tempText}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Update Note</button>
        </>
      ) : (
        <span onClick={handleNoteClick}>{text}</span>
      )}
      <div className="note-footer">
        {/* Display the note date*/}
        <small>{date}</small>
        <MdEditNote onClick={handleNoteClick} className="edit-icon" />
        {/* Delete icon for deleting the note*/}
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />{" "}
      </div>
    </div>
  );
};

export default Note;

import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote }) => {


  const handleInputChange = (event) => {
    setUpdatedText(event.target.value);
  };
  
  const editNote = () => {
    handleUpdateNote({
      id,
      text: updatedText,
      date,
    });

  };

  return (
    <div className="note">
      {/* Display the note text */}
      <input type="text" value={updatedText} onChange={handleInputChange} />
      <div className="note-footer">
        {/* Display the note date*/}
        <small>{date}</small>
        <MdEditNote 
          onClick={() => editNote(id)} 
          className="edit-icon"
        />
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />{" "}
        {/* Delete icon for deleting the note*/}
      </div>
    </div>
  );
};

export default Note;

import { MdDeleteForever } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote }) => {
  return (
    <div className="note">
      {/* Display the note text */}
      <span>{text}</span>
      <div className="note-footer">
        {/* Display the note date*/}
        <small>{date}</small>
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

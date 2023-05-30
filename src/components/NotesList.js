import Note from "./Note";
import AddNote from "./AddNote";

const NoteList = ({ notes, handleAddNote, handleDeleteNote, handlePostNote }) => {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <Note 
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    handleDeleteNote={handleDeleteNote}
                />
            ))} 
            <AddNote 
                handleAddNote={handleAddNote}
                handlePostNote={handlePostNote}
            />
        </div>
    );
}; 

export default NoteList;
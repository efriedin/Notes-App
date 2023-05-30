import React, { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const NOTES_API_URL = 'https://643efbc0b9e6d064beec702e.mockapi.io/notes';

  const [notes, setNotes] = useState([
    {
      id: '',
      text: '',
      date: '',
    },
  ]);

  // State for newNote
  const [newNote, setNewNote] = useState({
    id: '',
    text: '',
    date: '',
  });

  // State for noteText and setNoteText
  const [noteText, setNoteText] = useState('');

  // State for updating a note
  const [updateNote, setUpdateNote] = useState({
    id: '',
    text: '',
    date: '',
  });

  // State to hold text area values
  const [searchText, setSearchText] = useState('');

  // State to hold dark mode value
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(NOTES_API_URL)
      .then((data) => data.json())
      .then((data) => setNotes(data));
  }, []);

  // Get notes from API
  const getNotes = () => {
    console.log(`doing getNotes function`);

    fetch(NOTES_API_URL)
      .then((data) => data.json())
      .then((data) => setNotes(data));
  };

  // Post notes to API
const postNotes = async () => {
  console.log('doing postNotes...');

  try {
    const noteToPost = {
      id: '',
      text: newNote.text,
      date: '',
    };

    await fetch(NOTES_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteToPost),
    });
    getNotes();
    setNewNote({
      id: '',
      text: '',
      date: '',
    });
  } catch (error) {
    console.error('Error posting note:', error);
  }
};

  const handlePostNote = (text) => {
    console.log('doing postNotes...');
    const newNote = {
      id: '',
      text: text,
      date: '',
    };
    // Rest of your postNotes logic
  };

  const handleAddNote = (text) => {
    console.log('doing handleAddNote...');
    const newNote = {
      id: '',
      text: text,
      date: '',
    };
    postNotes(newNote); // Pass the newNote object to postNotes
  };
  

  // Delete note from API
  const deleteNotes = (id) => {
    console.log(id);
    console.log('Deleting Notes...');

    fetch(`${NOTES_API_URL}/${id}`, {
      method: 'DELETE',
    }).then(() => getNotes());
  };

  // Update notes on API
  const updateNotes = (note) => {
    console.log('Updating Notes name...');
    let updatedNotes = note;
    updatedNotes.text = updatedNotes;
    console.log(updateNotes);
    fetch(`${NOTES_API_URL}/${note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateNotes),
    }).then(() => getNotes());
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search
          handleSearchNote={(value) => {
            setSearchText(value.toLowerCase());
          }}
        />
        <NotesList
          handlePostNote={handlePostNote}
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
          handleAddNote={postNotes}
          handleDeleteNote={deleteNotes}
        />
      </div>
    </div>
  );
};

export default App;

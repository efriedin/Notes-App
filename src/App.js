import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {

  const NOTES_API_URL = 'https://643efbc0b9e6d064beec702e.mockapi.io/nots'

  const [notes, setNotes] = useState([
  {
    
    id: '',
    text: '',
    date: '',
    
  },
]);

//state to hold text area values 
const [searchText, setSearchText] = useState('');

//state to hold dark mode value
const [darkMode, setDarkMode] = useState(false);

//get item from local storage **replace with API
useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);

//set item to local storage **Replace with API
useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
  );
}, [notes]);

//function to update note state with new note
const addNote = (text) => {
  const date = new Date();
  const newNote = {
    id: id,
    text: text,
    date: date.toLocaleDateString()
  }
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
};

//function to update note state by removing a note
const deleteNote = (id) => {
  const newNotes = notes.filter((note) => note.id !== id)
  setNotes(newNotes);
};

//function to edit note and update state 

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header 
          handleToggleDarkMode={setDarkMode}
        />
        <Search
          handleSearchNote={setSearchText}
        />
        <NotesList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
   
  );
  
  
};

export default App
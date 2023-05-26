import React, { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {

  const NOTES_API_URL = 'https://643efbc0b9e6d064beec702e.mockapi.io/notes'

  const [notes, setNotes] = useState([
  {
    id: '',
    text: '',
    date: '',
  },
]);

//state for newNote
const [newNote, setNewNote] = useState ({
  id:'',
  text: '',
  date: ''
});

//state for updating a note
const [updateNote, setUpdateNote] = useState ({
  id: '',
  text: '',
  date: ''
});

//state to hold text area values 
const [searchText, setSearchText] = useState('');

//state to hold dark mode value
const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(NOTES_API_URL)
    .then((data) => data.json())
    .then((data) => setNotes(data))
  }, [])

  //get notes from api
  const getNotes = () => {
    console.log(`doing getNotes function`)

    fetch(NOTES_API_URL)
    .then((data) => data.json())
    .then((data) => setNotes(data))
  }

  //post notes to api
  const postNotes = (e) => {
    e.preventDefault()
    console.log('doing postNotes...')  

    fetch(NOTES_API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newNote),
    }).then(() => getNotes())
  }

  //delete note from API
  const deleteNotes = (id) => {
    console.log(id)
    console.log('Deleting Notes...')

    fetch(`${NOTES_API_URL}/${id}`, {
      method: 'DELETE',
    }).then(() => getNotes())
  }

  //update notes on API
  const updateNotes = (note) => {
    console.log('Updating Notes name...')
    let updatedNotes = note
      updatedNotes.text = updatedNotes
      console.log(updateNotes)
    fetch(`${NOTES_API_URL}/${note.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateNotes)
    }).then(() => getNotes())
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header 
          handleToggleDarkMode={setDarkMode}
        />
        <Search
          handleSearchNote= {(value) => {
            setSearchText(value.toLowerCase());
          }}
        />
        <NotesList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={postNotes}
          handleDeleteNote={deleteNotes}
        />
      </div>
    </div>
   
  );
  
};

export default App
import React, { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const NOTES_API_URL = "https://643efbc0b9e6d064beec702e.mockapi.io/notes";

  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState(""); // State to hold text area values
  const [darkMode, setDarkMode] = useState(false);  // State to hold dark mode value

  useEffect(() => {
    getNotes();
  }, []);

  // Function to fetch notes from API
  const getNotes = () => {
    fetch(NOTES_API_URL)
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => {
        console.log("Error fetching notes:", error);
      });
  };

  // Function to post a new note to the API
  const postNotes = async (text) => {
    try {
      const currentDate = new Date(); //get the current date
      const noteToPost = {
        text: text,
        date: currentDate.toISOString(), //conver the date to ISO string format
      };
      await fetch(NOTES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteToPost),
      });
      getNotes(); //Fetch the updated notes from the API
    } catch (error) {
      console.error("Error posting note:", error);
    }
  };

  //Function to delete a note from the API
  const deleteNotes = (id) => {
    fetch(`${NOTES_API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => getNotes()) //Fetch the updated notes from the API
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  // Function to update a note on the API (note implemented in the current code)
  const updateNotes = (updatedNote) => {
    fetch(`${NOTES_API_URL}/${updatedNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => response.json())
      .then((updatedNoteData) => {
        const updatedNotes = notes.map((note) => 
          note.id === updatedNoteData.id ? updatedNoteData : note
        );
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
        // Handle error scenario
      });
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      {" "}
      {/* Apply the 'dark-mode' class based on the value of dark mode state*/}
      <div className="container">
        {" "}
        {/* Container for the entire app */}
        <Header handleToggleDarkMode={setDarkMode} />{" "}
        {/* Render the Header component and pass the handleToggleDarkMode function */}
        <Search
          handleSearchNote={(value) => {
            /* Render the Search component and pass the handleSearchNote function */
            setSearchText(
              value.toLowerCase()
            ); /* Update the searchText state with the lowercase value of the search input */
          }}
        />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
          )} /* Filter the notes based on the searchText */
          handleAddNote={
            postNotes
          } /* Pass the PostNotes function to handle adding a new note */
          handleDeleteNote={
            deleteNotes
          } /* Pass the deleteNotes function to handle deleting a note */
          handleUpdateNote={
            updateNotes
          }
        />
      </div>
    </div>
  );
};

export default App;
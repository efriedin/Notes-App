import React, { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const NOTES_API_URL = "https://643efbc0b9e6d064beec702e.mockapi.io/notes";

  const [notes, setNotes] = useState([
    {
      id: "",
      text: "",
      date: "",
    },
  ]);

  // // State for noteText and setNoteText
  // const [noteText, setNoteText] = useState('');

  // State for updating a note
  const [updateNote, setUpdateNote] = useState({
    id: "",
    text: "",
    date: "",
  });

  // State to hold text area values
  const [searchText, setSearchText] = useState("");

  // State to hold dark mode value
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    //Fetch notes from the API on initial load
    fetch(NOTES_API_URL)
      .then((data) => data.json())
      .then((data) => setNotes(data));
  }, []);

  // Function to fetch notes from API
  const getNotes = () => {
    console.log(`doing getNotes function`);

    fetch(NOTES_API_URL)
      .then((data) => data.json())
      .then((data) => setNotes(data));
  };

  // Function to post a new note to the API
  const postNotes = async (text) => {
    console.log("doing postNotes...");

    try {
      const currentDate = new Date(); //get the current date
      const noteToPost = {
        id: "",
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

  //Function to handle post note (not used in the current code)
  const handlePostNote = (text) => {
    console.log("doing postNotes...");
    const newNote = {
      id: "",
      text: text,
      date: "",
    };
  };

  //Function to delete a note from the API
  const deleteNotes = (id) => {
    console.log(id);
    console.log("Deleting Notes...");

    fetch(`${NOTES_API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => getNotes()); //Fetch the updated notes from the API
  };

  // Function to update a note on the API (note implemented in the current code)
  const updateNotes = (note) => {
    console.log("Updating Notes name...");
    let updatedNotes = note;
    updatedNotes.text = updatedNotes;
    console.log(updateNotes);
    fetch(`${NOTES_API_URL}/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateNotes),
    }).then(() => getNotes()); //Fetch the updated notes from the API
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
            note.text.toLowerCase().includes(searchText)
          )} /* Filter the notes based on the searchText */
          handleAddNote={
            postNotes
          } /* Pass the PostNotes function to handle adding a new note */
          handleDeleteNote={
            deleteNotes
          } /* Pass the deleteNotes function to handle deleting a note */
        />
      </div>
    </div>
  );
};

export default App;

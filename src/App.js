import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import Navbar from "./components/Navbar/Navbar";
import { Calendar } from "./components/Calendar/Calendar";
import ToDoList from "./components/ToDo/ToDoList";


const App = () => {
  const NOTES_API_URL = "https://643efbc0b9e6d064beec702e.mockapi.io/notes";

  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    fetch(NOTES_API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched notes:", data);
        setNotes(data);
      })
      .catch((error) => {
        console.log("Error fetching notes:", error);
      });
  };

  const postNotes = async (text) => {
    try {
      const currentDate = new Date();
      const noteToPost = {
        text: text,
        date: currentDate.toISOString(),
      };
      await fetch(NOTES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteToPost),
      });
      getNotes();
    } catch (error) {
      console.error("Error posting note:", error);
    }
  };

  const deleteNotes = (id) => {
    fetch(`${NOTES_API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => getNotes())
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const updateNotes = (updatedNote) => {
    fetch(`${NOTES_API_URL}/${updatedNote.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
        console.error("Error updating note:", error);
      });
  };

  return (
    <Router>
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>
              <Header handleToggleDarkMode={setDarkMode} />
              <Search handleSearchNote={(value) => {
                setSearchText(value.toLowerCase());
              }} />
              <NotesList
                notes={notes.filter((note) =>
                  note.text.toLowerCase().includes(searchText.toLowerCase())
                )}
                handleAddNote={postNotes}
                handleDeleteNote={deleteNotes}
                handleUpdateNote={updateNotes}
              />
            </div>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/todo" element={<ToDoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

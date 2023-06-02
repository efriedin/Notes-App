import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { ajax } from "rxjs/ajax";

export const Calendar = () => {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const API_ENDPOINT = "https://643efbc0b9e6d064beec702e.mockapi.io/events";

  const fetchEvents = () => {
    ajax.getJSON(API_ENDPOINT).subscribe(setEvents);
  };

  const createEvent = (eventData) => {
    ajax.post(API_ENDPOINT, eventData).subscribe(fetchEvents);
  };

  const updateEvent = (eventId, eventData) => {
    ajax.put(`${API_ENDPOINT}/${eventId}`, eventData).subscribe(fetchEvents);
  };

  const deleteEvent = (eventId) => {
    ajax.delete(`${API_ENDPOINT}/${eventId}`).subscribe(fetchEvents);
  };

  const handleDayClick = (day) => {
    setSelected(day);
  };

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() !== "" && eventTime.trim() !== "") {
      const newEvent = {
        name: eventTitle,
        date: selected.toISOString(),
        time: eventTime,
      };
      createEvent(newEvent);
      setEventTitle("");
      setEventTime("");
    }
  };

  const handleEditEvent = (event) => {
    setEventTitle(event.name);
    setEventTime(event.time);
    updateEvent(event.id, event);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  const renderEvents = () => {
    const clickedDayEvents = events.filter(
      (event) =>
        format(new Date(event.date), "yyyy-MM-dd") === format(selected, "yyyy-MM-dd")
    );
  
    if (clickedDayEvents.length > 0) {
      return (
        <div className="events">
          <h4>Today's Events:</h4>
          <ul>
            {clickedDayEvents.map((event) => (
              <li key={event.id}>
                <span>{format(new Date(event.time), "HH:mm")}</span>:{" "}
                <span>{event.name}</span>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No events for this day.</p>;
    }
  };
  
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDayClick}
        footer={selected ? `You picked ${format(selected, "PP")}` : "Please pick a day"}
        showOutsideDays
      />
      <div>
        <h3>Events:</h3>
        {renderEvents()}
      </div>
      <div>
        <input
          type="text"
          value={eventTitle}
          onChange={handleEventTitleChange}
          placeholder="Event Title"
        />
        <input
          type="text"
          value={eventTime}
          onChange={handleEventTimeChange}
          placeholder="Event Time"
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};


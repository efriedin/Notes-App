import { DayPicker } from "react-day-picker";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ajax } from "rxjs/ajax";

export const Calendar = () => {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [editEvent, setEditEvent] = useState(null);

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
    ajax({
      url: `${API_ENDPOINT}/${eventId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    }).subscribe(fetchEvents);
  };
  
  

  const deleteEvent = (eventId) => {
    ajax.delete(`${API_ENDPOINT}/${eventId}`).subscribe(fetchEvents);
  };

  const handleDayClick = (day) => {
    setSelected(day);
    setEditEvent(null);
  };

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() !== "" && eventTime.trim() !== "") {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(eventTime)) {
        const newEvent = {
          name: eventTitle,
          date: selected.toISOString(),
          time: eventTime,
        };
        createEvent(newEvent);
        setEventTitle("");
        setEventTime("");
      } else {
        alert("Please enter a valid time in HH:mm format");
      }
    }
  };

  const handleEditEvent = (event) => {
    setEventTitle(event.name);
    setEventTime(event.time);
    setEditEvent(event);
  };

  const handleSaveEdit = () => {
    if (eventTitle.trim() !== "" && eventTime.trim() !== "" && editEvent) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(eventTime)) {
        const updatedEvent = {
          name: eventTitle,
          date: selected.toISOString(),
          time: eventTime,
        };
        updateEvent(editEvent.id, updatedEvent);
        setEventTitle("");
        setEventTime("");
        setEditEvent(null);
      } else {
        alert("Please enter a valid time in HH:mm format");
      }
    } else {
      alert("Please enter event title and time");
    }
  };
  

  const handleCancelEdit = () => {
    setEventTitle("");
    setEventTime("");
    setEditEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  const renderEvents = () => {
    const clickedDayEvents = events.filter(
      (event) =>
        format(new Date(event.date), "yyyy-MM-dd") ===
        format(selected, "yyyy-MM-dd")
    );

    if (clickedDayEvents.length > 0) {
      return (
        <div className="events">
          <h4>Today's Events:</h4>
          <ul>
            {clickedDayEvents.map((event) => (
              <li key={event.id}>
                {event.time && (
                  <span>{event.time.slice(0, 5)}</span>
                )}:{" "}
                <span>{event.name}</span>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editEvent && (
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
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          )}
        </div>
      );
    } else {
      return <p>No events for this day.</p>;
    }
  };

  return (
    <div>
      <DayPicker selected={selected} onDayClick={handleDayClick} />
      {renderEvents()}
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
          placeholder="Event Time (HH:mm)"
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

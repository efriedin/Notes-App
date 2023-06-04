import { DayPicker } from "react-day-picker";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ajax } from "rxjs/ajax";

export const Calendar = () => {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({ title: "", time: "" });
  const [editEvent, setEditEvent] = useState(null);


  useEffect(() => {
    fetchEvents();
  }, []);

  const API_ENDPOINT = "https://643efbc0b9e6d064beec702e.mockapi.io/events";

  const fetchEvents = () => {
    ajax.getJSON(API_ENDPOINT).subscribe(setEvents);
  };

  const createEvent = () => {
    if (event.title.trim() !== "" && event.time.trim() !== "") {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(event.time)) {
        const newEvent = {
          name: event.title,
          date: selected.toISOString(),
          time: event.time,
        };
        ajax.post(API_ENDPOINT, newEvent).subscribe(() => {
          fetchEvents();
          setEvent({ title: "", time: "" });
        });
      } else {
        alert("Please enter a valid time in HH:mm format");
      }
    }
  };

  const updateEvent = (eventId, eventData) => {
    ajax({
      url: `${API_ENDPOINT}/${eventId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).subscribe(() => {
      fetchEvents();
      setEvent({ title: "", time: "" });
      setEditEvent(null);
    });
  };

  const deleteEvent = (eventId) => {
    ajax.delete(`${API_ENDPOINT}/${eventId}`).subscribe(fetchEvents);
  };

  const handleDayClick = (day) => {
    setSelected(day);
    setEvent({ title: "", time: "" });
    setEditEvent(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = () => {
    createEvent();
  };

  const handleEditEvent = (event) => {
    setEvent({ title: event.name, time: event.time });
    setEditEvent(event);
  };

  const handleSaveEdit = () => {
    if (event.title.trim() !== "" && event.time.trim() !== "" && editEvent) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(event.time)) {
        const updatedEvent = {
          name: event.title,
          date: selected.toISOString(),
          time: event.time,
        };
        updateEvent(editEvent.id, updatedEvent);
      } else {
        alert("Please enter a valid time in HH:mm format");
      }
    } else {
      alert("Please enter event title and time");
    }
  };

  const handleCancelEdit = () => {
    setEvent({ title: "", time: "" });
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
          <ul className="list">
            {clickedDayEvents.map((event) => (
              <li key={event.id}>
                {event.time && <span>{event.time.slice(0, 5)}</span>}:{" "}
                <span>{event.name}</span>
                <button className="save-btn" onClick={() => handleEditEvent(event)}>Edit</button>
                <button className="save-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editEvent && (
            <div>
              <input
                className="calendar-input"
                type="text"
                name="title"
                value={event.title}
                onChange={handleInputChange}
                placeholder="Event Title"
              />
              <input
                className="calendar-input"
                type="text"
                name="time"
                value={event.time}
                onChange={handleInputChange}
                placeholder="Event Time"
              />
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
              <button className="save-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          )}
        </div>
      );
    } else {
      return <p>No events for this day.</p>;
    }
  };

  return (
    <div className="calendar">
      <DayPicker selected={selected} onDayClick={handleDayClick} />
      {renderEvents()}
      <div>
        <input
          className="calendar-input"
          type="text"
          name="title"
          value={event.title}
          onChange={handleInputChange}
          placeholder="Event Title"
        />
        <input
          className="calendar-input"
          type="text"
          name="time"
          value={event.time}
          onChange={handleInputChange}
          placeholder="Event Time (HH:mm)"
        />
        <button className="save" onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

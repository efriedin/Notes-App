import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import React, { useState, useEffect } from 'react'
import "react-day-picker/dist/style.css"

const css = `
  .my-today {
    font-weight: bold;
    font-size: 140%;
    color: red;
    background: url(https://media3.giphy.com/media/ujpaHBFQxnZIALTObQ/giphy.gif);
    background-size: cover;
  }

  .my-selected:not([disabled]) {
    font-weight: bold;
    border: 2px solid currentColor;
    background-color: green;
    background-size: cover;
  }

  .my-event {
    background-color: yellow;
    color: black;
  }
`

export const Calendar = () => {
  const [selected, setSelected] = useState()
  const [events, setEvents] = useState([])

  let footer = <p>Please pick a day</p>
  if(selected) {
    footer = <p>You picked {format(selected, 'PP')}</p>;
  }

  useEffect(() => {
    const savedEvents = localStorage.getItem('events')
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents)
        setEvents(parsedEvents)
      } catch (error) {
        console.error('Error parsing events from local storage:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleDayClick = (day) => {
    const eventTitle = prompt("Enter event title:")
    if (eventTitle) {
      const newEvent = {
        day,
        title: eventTitle
      }
      setEvents([...events, newEvent])
    }
  }

  const modifiers = {
    selected: selected ? selected : undefined,
    today: new Date()
  }

  const modifiersClassNames = {
    selected: 'my-selected',
    today: 'my-today',
    event: 'my-event'
  }

  return (
    <div>
      <style>{css}</style>
      <DayPicker 
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        onDayClick={handleDayClick}
        showOutsideDays
      />
      <div>
        <h3>Events:</h3>
        {events.map((event, index) => (
          <div key={index}>
            <span>{format(event.day, 'PP')}</span>: <span>{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

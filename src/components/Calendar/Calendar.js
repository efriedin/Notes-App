import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import React, { useState } from 'react'
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

`

export const Calendar = () => {
  const [selected, setSelected] = useState()

  let footer = <p>Please pick a day</p>
  if(selected) {
    footer = <p>You picker {format(selected, 'PP')}</p>;
  }


  return (
    <div>
      <style>{css}</style>
      <DayPicker 
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
        showOutsideDays
      />
    </div>
  )
}

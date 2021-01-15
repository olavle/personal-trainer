import { React, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarView = () => {
  const [trainings, setTrainings] = useState([])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((res) => res.json())
      .then((responseJson) => setTrainings(responseJson)) //HUOM .content
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getTrainings()
  }, [])

  return (
    <div style={{ width: '50%', height: '50%' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{center:'dayGridMonth,dayGridWeek,dayGridDay'}}
        views={'dayGridMonth', 'dayGridWeek', 'dayGridDay'}
        weekends={true}
        firstDay={1}
        events={trainings.map((data) => {
          return {
            title: data.activity,
            date: data.date,
            color: `#${Math.floor(Math.random() * Math.floor(999999))}`,
            id: data.id,
          }
        })}
      />
    </div>
  )
}

export default CalendarView

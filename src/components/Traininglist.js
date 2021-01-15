import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const Traininglist = () => {
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

  const colums = [
    { field: 'id', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { field: 'customer.firstname', sortable: true, filter: true },
  ]

  return (
    <div className='ag-theme-material' style={{ height: 400, width: '100%' }}>
      <AgGridReact columnDefs={colums} rowData={trainings} />
    </div>
  )
}

export default Traininglist

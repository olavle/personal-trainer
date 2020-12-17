import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Customerlist = () => {
  const [customers, setCustomers] = useState([])

  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((res) => res.json())
      .then((responseJson) => setCustomers(responseJson.content)) //HUOM .content
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const colums = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filer: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
  ]

  return (
    <div className='ag-theme-material' style={{ height: 400, width: '80%' }}>
      <AgGridReact columnDefs={colums} rowData={customers} />
    </div>
  )
}

export default Customerlist

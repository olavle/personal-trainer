import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

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

  const deleteCustomer = (params) => {

    if (window.confirm('Are you sure to delete ?')) {
      console.log(params.value)
    }
    
  }

  const colums = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },

    {
      headerName: '',
      field: 'links.0.href',
      width: 90,
      cellRendererFramework: (params) => (
        <IconButton onClick={() => deleteCustomer(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]

  return (
    <div className='ag-theme-material' style={{ height: 400, width: '100%' }}>
      <AgGridReact columnDefs={colums} rowData={customers} />
    </div>
  )
}

export default Customerlist

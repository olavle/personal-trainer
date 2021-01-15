import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import EditCustomer from './EditCustomer'
import AddCustomer from './AddCustomer'

const Customerlist = () => {
  const [customers, setCustomers] = useState([])
  const [open, setOpen] = useState(false)

  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((res) => res.json())
      .then((responseJson) => setCustomers(responseJson.content)) //HUOM .content
      .catch((err) => console.error(err))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const updateCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
      .then((response) => getCustomers())
      .catch((err) => console.error(err))
    console.log(link, customer)
  }

  const deleteCustomer = (params) => {
    if (window.confirm('Are you sure to delete ?')) {
      fetch(params.value, {
        method: 'DELETE',
      })
        .then((_) => getCustomers())
        .then((_) => handleOpen())
        .catch((err) => console.error(err))
    }
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCustomer)
    })
    .then(response => {
      console.log('server said:', response)
      getCustomers()
    })
    .catch(err => console.error(err))
  }  

  const colums = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    {
      headerName: '',
      field: '',
      width: 90,
      cellRendererFramework: (params) => {
        console.log(params)
        return <EditCustomer updateCustomer={updateCustomer} params={params} />
      },
    },

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
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div className='ag-theme-material' style={{ height: 400, width: '100%' }}>
        <AgGridReact columnDefs={colums} rowData={customers} />
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2500}
        message='Customer deleted succesfully'
      />
    </div>
  )
}

export default Customerlist

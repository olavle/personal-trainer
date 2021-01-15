import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const Traininglist = () => {
  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((res) => res.json())
      .then((responseJson) => setTrainings(responseJson)) //HUOM .content
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getTrainings()
  }, [])

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure to delete ?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: 'DELETE',
      })
        .then((_) => getTrainings())
        .then((_) => handleOpen())
        .catch((err) => console.error(err))
    }
  }

  const colums = [
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      cellRendererFramework: (date) => moment(date).format('MMM Do YY'),
    },
    { field: 'duration', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { field: 'customer.firstname', sortable: true, filter: true },
    { field: 'customer.lastname', sortable: true, filter: true },
    {
      headerName: '',
      field: 'id',
      width: 90,
      cellRendererFramework: (params) => (
        <IconButton onClick={() => deleteTraining(params.value)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]

  return (
    <div className='ag-theme-material' style={{ height: 600, width: '100%' }}>
     
        <AgGridReact columnDefs={colums} rowData={trainings} />
      
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2500}
        message='Training deleted succesfully'
      />
    </div>
  )
}

export default Traininglist

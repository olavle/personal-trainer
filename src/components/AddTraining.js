import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import moment from 'moment'

const AddTraining = ({ customerLink ,addTraining }) => {
  const [open, setOpen] = useState(false)
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: customerLink.value,
  })

  const handleClickOpen = () => {
    setOpen(true)
    console.log(customerLink)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const inputChanged = (event) => {
    if (event.target.name === 'date') {
        setTraining({
            ...training,
            date: moment(event.target.value).toISOString()
        })
    }
    setTraining({
      ...training,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    addTraining(training)
    handleClose()
  }

  return (
    <div>
      <div>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={handleClickOpen}
        >
          Add new training
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New training</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              label='Date'
              fullWidth
              name='date'
              type='date'
              value={training.date}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='Activity'
              fullWidth
              name='activity'
              value={training.activity}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='Duration'
              fullWidth
              name='duration'
              value={training.duration}
              onChange={inputChanged}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSave} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default AddTraining

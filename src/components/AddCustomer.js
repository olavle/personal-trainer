import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const AddCustomer = ({addCustomer}) => {
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    city: '',
    phone: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const inputChanged = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    addCustomer(customer)
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
          Add new customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New customer</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              label='Firstname'
              fullWidth
              name='firstname'
              value={customer.firstname}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='Lastname'
              fullWidth
              name='lastname'
              value={customer.lastname}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='Email'
              fullWidth
              name='email'
              value={customer.email}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='City'
              fullWidth
              name='city'
              value={customer.city}
              onChange={inputChanged}
            />
            <TextField
              margin='dense'
              label='Phone'
              fullWidth
              name='phone'
              value={customer.phone}
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

export default AddCustomer

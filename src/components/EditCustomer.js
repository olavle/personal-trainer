import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const EditCustomer = ({ params, updateCustomer }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = setOpen(!open)
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    city: '',
    phone: '',
  })

  const handleClickOpen = () => {
    setCustomer({
      firstname: params.data.firstname,
      lastname: params.data.lastname,
      email: params.data.email,
      city: params.data.city,
      phone: params.data.phone,
    })
    toggleOpen();
  }

  return <div>Hello editcar</div>
}

export default EditCustomer

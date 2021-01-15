import './App.css'
import Customerlist from './components/Customerlist'
import Tarinerlist from './components/Traininglist'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Toolbar } from '@material-ui/core'

function App() {
  const [value, setValue] = useState('one')

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h3'>Personal Trainer app</Typography>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor='primary'
        >
          <Tab value='one' label='Customers' />
          <Tab value='two' label='Trainings' />
          <Tab value='three' label='Calendar View' />
        </Tabs>
      </AppBar>
      {value === 'one' && <Customerlist />}
      {value === 'two' && <Tarinerlist />}
      {value === 'three' && <div>Calendar View here</div>}
    </div>
  )
}

export default App

// <div className="App">
//       <Customerlist />
//     </div>

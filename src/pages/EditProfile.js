import { Button, Typography } from '@mui/material';
import React from 'react';
import './EditProfile.css';

function EditProfile() {
  return (
    <div className='container'>
      <Typography>Edit your profile: </Typography>
      <div className='form'>
        <div className='section'>
          <Typography>Name:</Typography>
          <input type='text' />
        </div>
        <div className='section'>
          <Typography>Email:</Typography>
          <input type='text' />
        </div>
        <div className='section'>
          <Typography>Password:</Typography>
          <input type='password' />
        </div>
        <Button variant='contained'>Save Changes</Button>
      </div>
    </div>
  )
}

export default EditProfile
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Box, Button, Modal, TextField, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function AddNewTask({ open, setOpen, name, setName, description, setDescription, status, setStatus, handleNewTask }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleSelectChange = (e) => {
    setStatus(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div style={{margin: '10px'}}>
          <TextField id="name" label="Task Name" value={name} onChange={(e) => handleNameChange(e)}/>
        </div>
        <div style={{margin: '10px'}}>
          <TextField id="description" label="Task Description" value={description} onChange={(e) => handleDescriptionChange(e)}/>
        </div>
        <div style={{margin: '10px'}}>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(e) => handleSelectChange(e)}
                label="Status"
              >
                <MenuItem value='TODO'>To-Do</MenuItem>
                <MenuItem value='DOING'>In Progress</MenuItem>
                <MenuItem value='DONE'>Done</MenuItem>
            </Select>
            </FormControl>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={() => handleNewTask()} style={{margin: '10px'}}>
            Save Task
          </Button>
        </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        
      >
        {body}
      </Modal>
    </div>
  );
}
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Box, Button, Container} from '@material-ui/core'
import {AddNewTask} from "./AddNewTask"
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import "@lourenci/react-kanban/dist/styles.css";
import { useSnackbar } from "notistack";
import Draggable from 'react-draggable'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 'auto',
    width: '150px',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export function Taskboard({KanbanDB }) {
  //console.log("taskboard comp")
  //console.log(useWindowSize())
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const windowSize1 = useWindowSize()

  const [db, setDB] = useState(null)

  //State variable for headers
  const [headers, setHeaders] = useState(["To-Do", "In Progress", "Done"])

  const [cardsList, setCardsList] = useState([])

  //State variable for list of todo tasks
  const [todoList, setTodoList] = useState([])

  //State variable for list of in progress tasks
  const [inProgress, setInProgressList] = useState([])

  //State variable for list of done tasks
  const [done, setDoneList] = useState([])

  //Modal settings
  const [open, setOpen] = useState(false)

  //Add new task
  const [idValue, setID] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  //set type of functionality
  const [type, setType] = useState('Add')
  
  const [selected, setSelected] = useState('');
  const [activeDrags, setActiveDrags] = useState(0)
  const [stopItem, setStopItem] = useState('')

  useEffect(async () => {
    // Initializing KanabanDB connection and saving it in db state
    let dbvar = await KanbanDB.connect();
    //console.log("db",dbvar)
    setDB(dbvar)
  }, [KanbanDB])
  
  const handleClose = () => {
    //On modal close function, and set name, description and status states to empty string
    setOpen(false)
    setName('')
    setDescription('')
    setStatus('')
  }

  const onStart = () => {
    //On Drag start
    let activeDragsVal = activeDrags
    setActiveDrags(++activeDragsVal)
  };

  const onStop = (e) => {
    //On Drag stop
    let activeDragsVal = activeDrags
    setActiveDrags(--activeDragsVal)    
    //console.log("activeDragsVal", e)
    let selectedID = e.target.id
    let selectedCard = null
    //console.log("windowSize1", windowSize1)
    let eachCol = windowSize1.width / 3
    let statusChanged = ''

    //To find the card that was dragged and dropped
    for(var i=0;i<cardsList.length;i++){
      if(selectedID === cardsList[i].id){
        selectedCard = cardsList[i]
        //console.log(cardsList[i])
        break;
      }
    }
    
    //console.log(selectedCard, eachCol, e.x)
    if(selectedCard !== null){
      if(e.x<=eachCol){
        //change status to Todo list
        statusChanged = "TODO"
        updateCard(selectedID, statusChanged, selectedCard)
      }
      else if(e.x>eachCol && e.x<= (2*eachCol)){
        //change status to in progress list
        statusChanged = "DOING"
        updateCard(selectedID, statusChanged, selectedCard)
      }
      else{
        //change status to done list
        statusChanged = "DONE"
        updateCard(selectedID, statusChanged, selectedCard)
      }      
    } 
  };

  const updateCard = async (selectedID, statusChanged, cardDetails) => {
    //Update card details after drag and drop
    const updateCard = await db.updateCardById(selectedID, {
      name: cardDetails.name,
      description: cardDetails.description,
      status: statusChanged,
      lastUpdated: new Date()
    });
    enqueueSnackbar('Card updated!')

    const cards = await db.getCards();
    //console.log('all cards from DB (should have new records)', cards);
    handleCards(cards)   
  }

  const handleNewTask = async () => {
    //Saving newly added task and update existing card
    try{
      if(type.toUpperCase() === 'ADD'){
        const cardId = await db.addCard({
          name: name,
          description: description,
          status: status,
          createdDate: new Date(),
          lastUpdated: new Date()
        });
        enqueueSnackbar('New card added!')
      }
      else if(type.toUpperCase() === 'EDIT'){
        const updateCard = await db.updateCardById(idValue, {
          name: name,
          description: description,
          status: status,
          lastUpdated: new Date()
        });
        enqueueSnackbar('Card updated!')
      }
      
      handleClose()
  
      const cards = await db.getCards();
      //console.log('all cards from DB (should have new records)', cards);
      handleCards(cards)   
    }
    catch(err){
      enqueueSnackbar("Couldn't save card!")
    }
  }

  const handleCards = (cards) => {
    //Diving all cards list to todo, doing and done
    setCardsList(cards)
    let todo = cards.filter(card => card.status.toUpperCase() === "TODO")
    console.log("todo", todo)
    setTodoList(todo)

    let inProgressList = cards.filter(card => card.status.toUpperCase() === "DOING")
    console.log("inProgressList", inProgressList)
    setInProgressList(inProgressList)

    let doneList = cards.filter(card => card.status.toUpperCase() === "DONE")
    console.log("doneList", doneList)
    setDoneList(doneList)
  }

  const handleNew = () => {
    //Open modal to add new card
    setOpen(true)
    setType('Add')
    setName('')
    setDescription('')
    setStatus('')
  }

  const handleEdit = async (id) => {
    //Open modal to edit exisitng card details
    //console.log("handleEdit", id)
    //console.log(cardsList)
    let cardDetails = await db.getCardById(id)
    setID(id)
    setName(cardDetails.name)
    setDescription(cardDetails.description)
    setStatus(cardDetails.status)
    setOpen(true)
    setType('Edit')
  }

  const handleDelete = async (id) => {
    //Delete a card
    // console.log("id", id)
    try{
      let res = await db.deleteCardById(id)
      //console.log("res", res, id)
      enqueueSnackbar('Card Deleted!')
      try{
        let cards = await db.getCards()
        //console.log("cards", cards)
        handleCards(cards)
      }
      catch (err){
        handleCards([])
      }
      
    }
    catch (err){
      enqueueSnackbar("Couldn't delete card!")
      //console.log("cannot delete card", err)
    }
  }

  function useWindowSize() {
    //To get window size of the screen
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
  
  return (
    <Box container style={{backgroundColor: 'lightgray', margin: '25px', height: '100%', width: "96%"}} >
      <Box style={{height: '75%', backgroundColor: 'lightgray',}} >
        <Grid container className={classes.root} style={{height: '100%'}}>
        <Grid item xs={12}>

          {/*Grid for headers */}
          <Grid  container
            direction="row"
            justify="space-evenly"
            alignItems="baseline">
            {headers.map((value) => (
              <Grid key={value} item style={{margin: "25px"}}>
                <Typography style={{color: "blue", fontWeight: "bold", fontSize: "20px"}}>{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          {/*Grid for todo tasks*/}
         
            <Grid 
            direction="column"
            justify="space-evenly"
            alignItems="baseline">
            
            {todoList.map((value) => (
               
              <Grid key={value.id} item xs={12} id={value.id}>
              <Draggable
               onStart={onStart}
               onStop={(e) => onStop(e)} 
             >
                <Paper className={classes.paper} style={{margin: "10px", position: 'relative', left: 250}} id={value.id}>
                  <Typography style={{fontSize: "14px"}} id={value.id}>{value.name}: {value.description}</Typography>
                  <Button onClick={() => handleEdit(value.id)} id={value.id}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(value.id)} id={value.id}>
                    <DeleteIcon />
                  </Button>
                </Paper>
              </Draggable>
              </Grid>
            ))}
           
          </Grid>
          
        </Grid>

        <Grid item xs={4}>
          {/*Grid for in progress tasks*/}
          
              <Grid 
              direction="column"
              justify="space-evenly"
              alignItems="baseline">
              {inProgress.map((value) => (
                
                <Grid key={value.id} item xs={12} id={value.id}>
                <Draggable
                onStart={onStart}
                onStop={(e) => onStop(e)} 
              >
                  <Paper className={classes.paper} style={{margin: "10px", position: 'relative', left: 165}} id={value.id}>
                    <Typography style={{fontSize: "14px"}} id={value.id}>{value.name}: {value.description}</Typography>
                    <Button onClick={() => handleEdit(value.id)} id={value.id}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(value.id)} id={value.id}>
                      <DeleteIcon />
                    </Button>
                  </Paper>
                </Draggable>   
                </Grid>
              ))}
            </Grid>
                 
        </Grid>

        <Grid item xs={4}>
          {/*Grid for done tasks */}
          
              <Grid 
              direction="column"
              justify="space-evenly"
              alignItems="baseline">
              {done.map((value) => (
                
                <Grid key={value.id} item xs={12} id={value.id}>
                <Draggable              
                  onStart={onStart}
                  onStop={(e) => onStop(e)}   
                >
                  <Paper className={classes.paper} style={{margin: "10px", position: 'relative', left: 100}} id={value.id}>
                    <Typography style={{fontSize: "14px"}} id={value.id}>{value.name}: {value.description}</Typography>
                    <Button onClick={() => handleEdit(value.id)} id={value.id}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(value.id)} id={value.id}>
                      <DeleteIcon />
                    </Button>
                  </Paper>
                  </Draggable>
                </Grid>
                
              ))}
            </Grid>
                    
        </Grid>
        
      </Grid>      
    </Box>

      <Box style={{position: 'absolute', bottom: '50px', right: '25px'}}>
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleNew()}>
            Add New
          </Button>
        </Box>

        <AddNewTask open={open} 
          setOpen={setOpen} 
          name={name}
          setName={setName} 
          description={description}
          setDescription={setDescription} 
          status={status}
          setStatus={setStatus} 
          handleNewTask={handleNewTask}/>
        </Box> 
    </Box>
       
  );
}
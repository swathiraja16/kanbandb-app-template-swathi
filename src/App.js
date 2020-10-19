import React from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanDB from 'kanbandb/dist/KanbanDB';
import {Taskboard} from './components/Taskboard'

function initialize() {
  /**
   * 
   * Use KanbanDB like so (but you might want to move it) - types are provided:
   * 
   */

  KanbanDB.connect();

}

function App() {
  // Initialize DB communications.
  initialize();

  return (
    <Taskboard KanbanDB={KanbanDB}/>
  );
}

export default App;

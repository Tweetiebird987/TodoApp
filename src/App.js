import React from "react";
import './App.css';

//Import components
import TaskForm from './components/TaskForm';
import TaskList from "./components/TaskList";

function App() {
  
  return (
    <div className="App">
      <header>
        <h1>Arnold's Task List</h1>
      </header>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;

// Librarary
import React, { useState, useRef, useEffect } from 'react';
import classes from './App.module.css';
import axios from '../../axios-firebase';

//Component
import Task from '../../Components/Task/Task';


function App() {

  // States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  //Refs
  let inputTextRef = useRef(null);

  //Etats

    //DidMount => Focus Input
  useEffect(() => {
    inputTextRef.current.focus();

    fetchTaks();
  },[]);


  // Fonctions
  const removeClickedHandler = (index,id) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    axios
      .delete('/tasks/' + id + '.json')
      .then( response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const doneClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);

    console.log(newTasks[index]);

    axios
      .put('/tasks/' + newTasks[index].id + '.json',newTasks[index])
      .then( response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const submittedTaskHandler = event => {
    event.preventDefault();

    const newTask = {
      content: input,
      done: false
    }
    setTasks([...tasks, newTask]);
    setInput('');

    axios
      .post('/tasks.json', newTask)
      .then( response => {
        console.log(response)
        fetchTaks();
      })
      .catch(error => {
        console.log(error)
      });
  }

  const changedFormHandler = event => {
    setInput(event.target.value);
  }

  const fetchTaks = () => {
    axios
      .get('/tasks.json')
      .then(response => {
        console.log(response)
        const taksFirebase = [];
        for(let key in response.data){
          taksFirebase.push({...response.data[key],id: key})
        }
        setTasks(taksFirebase)
        console.log(tasks);
      })
      .catch(error => {
        console.log(error)
      });
  };


  // Variables
  let tasksDisplayed = tasks.map((task, index) => (
    <Task
      done={task.done}
      content={task.content}
      key={task.id}
      removeClicked={() => removeClickedHandler(index,task.id)}
      doneClicked={() => doneClickedHandler(index)}
    />
  ));

  //JSX
  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input
            ref = {inputTextRef}
            type="text"
            value={input}
            onChange={(e) => changedFormHandler(e)}
            placeholder="Que souhaitez-vous ajouter ?"/>
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>

      {tasksDisplayed}
    </div>
  );
}

export default App;

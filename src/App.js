import React,{useState,useRef,useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todos';

function App() {
  //console.log(JSON.parse(localStorage.getItem('todos')));
  const newTodo = useRef();
  const [Todos,setTodos] = useState([]);


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedTodos);
    if (storedTodos) {
      setTodos(storedTodos);
      // console.log("setTodos");
      // console.log(storedTodos);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Todos));
    // console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
    //console.log(JSON.parse(localStorage.getItem('todos')));
  }, [Todos]);

  

  function addElement(e) {
    const name = newTodo.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    });
    newTodo.current.value = null;
  }

  function toggleComplete(id){
    const newTodos = [...Todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearCompleted(){
    const newTodos = Todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function clearEverything(){ 
    setTodos([]);
  }

  return (
    <>
    <TodoList todos={Todos} toggleComplete={toggleComplete}/>
    <input ref={newTodo} type="text" placeholder="Enter item"/>
    <button onClick={addElement} >Add</button>
    <button onClick={clearCompleted}>Clear Completed </button>
    <button onClick={clearEverything}>Clear Everything </button>
    <div>{Todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;

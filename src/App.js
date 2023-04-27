import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Stars from './Stars'
import TodoList from './TodoList'
import './App.css';
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if  (name === '') return;
    console.log("Added Todo:", name)
    setTodos(prevTodos => {
      const toSort = [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      sortTodos(toSort)
      return toSort
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    let newTodos = [...todos];
    const todoIndex = newTodos.findIndex(todo => todo.id === id );
    const todo = newTodos[todoIndex];
    todo.complete = !todo.complete;
    sortTodos(newTodos)
    setTodos(newTodos)
  }

  //move completed at the end of array
  function sortTodos(arr) {
    arr.sort((a, b) => {
      if (a.complete === b.complete) {
        return 0;
      }
      return a.complete ? 1 : -1;
    });
  }

  function handleClearTodos() {
    if (window.confirm("Do you really want to Clear Completed Todos?")) {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }
  }

  return (
    <>
      <Stars count={ 10 } />
      <div className="container pt-4 text-white">
        <div className="row">
          <div className="col-12 text-center mb-4"><h1>My Todos</h1></div>
          <div className="col-12">
            <div className="input-group input-group-lg mb-3">
              <input className="form-control" placeholder="Type your todo here..." ref={todoNameRef} type="text"/>
            </div>
            <div className="input-group mb-3">
              <button onClick={handleAddTodo} className="btn btn-dark form-control">Add Todo</button>
              <button onClick={handleClearTodos} className="btn btn-light form-control">Clear <small className="d-inline-block">Completed Todos</small></button>
            </div>
              <TodoList todos={todos} toggleTodo={toggleTodo} />
              <div className="alert alert-info">{todos.filter(todo => !todo.complete).length} left todo</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

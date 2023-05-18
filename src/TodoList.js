import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './todo.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = () => {
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([newTodoItem, ...todos]);
    setNewTodo('');
  };

  const updateTodo = (id, newTitle) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
          completed: !todo.completed, // Toggle the completed status
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };
  

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <div id="inputdiv">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} id="input" />
        <button onClick={addTodo} id="add">
          Add Todo
        </button>
      </div>
      <ul id="mylist" >
        {todos.map(todo => (
          <li key={todo.id} className="list">
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoTitle}
                  onChange={(e) => setEditingTodoTitle(e.target.value)} id='changeinput'
                />
                <button onClick={() => updateTodo(todo.id, editingTodoTitle)} id="update">
                  Update
                </button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                <div>
                  <button onClick={() => updateTodo(todo.id, todo.title)} id="complete">
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} id="delete">
                    Delete
                  </button>
                  <button onClick={() => {
                    setEditingTodoId(todo.id);
                    setEditingTodoTitle(todo.title);
                  }} id="edit">
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

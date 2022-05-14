import { useEffect, useLayoutEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
// @ts-ignore
import uuid from 'react-uuid'
interface Task {
  id: number | string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle) return
    const createNewTask: Task = {
      id: uuid(),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, createNewTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number | string) {
    const differentTasks = tasks.filter(task => task.id !== id)
    const verificatorTask = tasks.find(task => task.id === id)
    if(verificatorTask) {
      const currentTask: Task= verificatorTask
      let editedTask: Task = {...currentTask, isComplete: !currentTask.isComplete}
      setTasks([...differentTasks, editedTask])
    }
  }

  function handleRemoveTask(id: number | string) {
    const differentTasks = tasks.filter(task => task.id !== id)
    setTasks(differentTasks)
  }

  // useLayoutEffect(() => {
  //   const getTasksinlocalStorage = localStorage.getItem('tasksToDo')
  //   if(getTasksinlocalStorage) {
  //     const tasksInTheLocalStorage: Task[] = JSON.parse(getTasksinlocalStorage)
  //     setTasks(tasksInTheLocalStorage)
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('tasksToDo', JSON.stringify(tasks))
  // }, [tasks])

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
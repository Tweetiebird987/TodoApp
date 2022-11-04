import React, { useEffect, useState } from "react";

import useTaskStore from '../stores/taskStore'

const TaskForm = () => {
    const {tasks, addTask, filterTasks} = useTaskStore(
        (state) => ({
            tasks: state.tasks,
            addTask: state.addTask,
            filterTasks: state.filterTasks
        }))

    const [taskName, setTaskName] = useState("")
    const [status, setStatus] = useState("all")
    
    // Filter the tasks whenever the task state is change or the filter menu is changed
    useEffect(() => {
        filterTasks(status);
    },[tasks,status])

    // Invoke the addTask function and pass the given task name and then reset the input field
    const handleTaskSubmit = (e) => {
        e.preventDefault()
        addTask({
            id: Math.ceil(Math.random() * 1000000),
            taskName: taskName,
            completed: false,
            priority: false
        })
        setTaskName("")
    }

    return(
        <form>
            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="todo-input" />
            <button onClick={handleTaskSubmit} className="todo-button" type="submit" data-testid="SubmitBtn">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select name="todos" className="filter-todo" 
                onChange={(e) => {setStatus(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};

export default TaskForm;
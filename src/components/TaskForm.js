import React, { useEffect, useState } from "react";

import useTaskStore from '../stores/taskStore'

const TaskForm = () => {
    const {tasks, addTask, filterTask} = useTaskStore(
        (state) => ({
            tasks: state.tasks,
            addTask: state.addTask,
            filterTask: state.filterTasks
        }))

    const [taskName, setTaskName] = useState("")
    const [status, setStatus] = useState("all")

    useEffect(() => {
        filterTask(status);
    },[tasks,status])

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        addTask({
            id: Math.ceil(Math.random() * 1000000),
            taskName: taskName,
            completed: false
        })
        setTaskName("")
    }

    return(
        <form>
            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="todo-input" />
            <button onClick={handleTaskSubmit} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select defaultValue="all" name="todos" className="filter-todo" 
                onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};

export default TaskForm;
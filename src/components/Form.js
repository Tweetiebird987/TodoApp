import React, { useState } from "react";

import useTaskStore from '../stores/taskStore'

const Form = () => {
    const addTask = useTaskStore((state) => state.addTask)

    const [taskName, setTaskName] = useState("")

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        addTask({
            id: Math.ceil(Math.random() * 1000000),
            task: taskName,
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
            {/* <div className="select">
                <select defaultValue="all" name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div> */}
        </form>
    );
};

export default Form;
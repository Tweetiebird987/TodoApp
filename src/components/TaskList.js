import React from 'react'

import useTaskStore from '../stores/taskStore'

const TaskList = () => {
    const { tasks, removeTask, toggleTaskStatus} = useTaskStore(
        (state) => ({
            tasks: state.tasks,
            removeTask: state.removeTask,
            toggleTaskStatus: state.toggleTaskStatus
        })
    )

    return (
        <div className='todo-container'>
            <ul className='todo-list'>
                {tasks.map((task, id)=> {
                    return (
                        <React.Fragment key={id}>
                            <div className='todo'>
                                <li className={`todo-item ${task.completed ? "completed" : ''}`}>{task?.taskName}</li>

                                <button onClick={(e) => {toggleTaskStatus(task.id)}} className='complete-btn'>
                                    <i className="fas fa-check"></i>
                                </button>

                                <button onClick={() => {removeTask(task.id)}} className='trash-btn'>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    )
}

export default TaskList
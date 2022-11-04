import React from 'react'

import useTaskStore from '../stores/taskStore'

const TaskList = () => {
    const { tasks ,removeTask, toggleTaskStatus, filteredTasks} = useTaskStore(
        (state) => ({
            tasks: state.tasks,
            removeTask: state.removeTask,
            toggleTaskStatus: state.toggleTaskStatus,
            filteredTasks: state.filteredTasks
        })
    )

    return (
        <div className='todo-container'>
            <ul className='todo-list'>
                {filteredTasks.map((task, id)=> {
                    return (
                        <React.Fragment key={id}>
                            <div className='todo'>
                                <li className={`todo-item ${task.completed ? "completed" : ''}`} data-testid={task.taskName + " Task"}>{task?.taskName}</li>

                                <button onClick={(e) => {toggleTaskStatus(task.id)}} className='complete-btn' data-testid={task.taskName + " StatusBtn"}>
                                    <i className="fas fa-check"></i>
                                </button>

                                <button onClick={() => {removeTask(task.id)}} className='trash-btn' data-testid={task.taskName + " DeleteBtn"}>
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
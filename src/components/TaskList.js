import React from 'react'

import useTaskStore from '../stores/taskStore'

const TaskList = () => {
    const { removeTask, toggleTaskStatus, filteredTasks, togglePriorityStatus} = useTaskStore(
        (state) => ({
            removeTask: state.removeTask,
            toggleTaskStatus: state.toggleTaskStatus,
            filteredTasks: state.filteredTasks,
            togglePriorityStatus: state.togglePriorityStatus
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

                                <button onClick={() => {toggleTaskStatus(task.id)}} className='complete-btn' data-testid={task.taskName + " StatusBtn"}
                                title="Toggle Completed">
                                    <i className="fas fa-check"></i>
                                </button>

                                <button onClick={() => {togglePriorityStatus(task.id)}} className={`priority-btn ${task.priority ? "priority-on" : ''}`} 
                                title="Set Priority">
                                    <i className="fas fa-lightbulb"></i>
                                </button>

                                <button onClick={() => {removeTask(task.id)}} className='trash-btn' data-testid={task.taskName + " DeleteBtn"}
                                title="Delete Task">
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
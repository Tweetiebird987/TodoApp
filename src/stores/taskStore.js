import create from "zustand";

import {devtools, persist} from "zustand/middleware"

const taskStore = (set) => ({
    tasks: [],
    addTask: (taskName) => { 
        set((state) => ({
            tasks: [taskName, ...state.tasks],
        }))
    },
    removeTask: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((taskName) => taskName.id !== taskId)
        }))
    },
    toggleTaskStatus: (taskId) => {
        set((state) => ({
            tasks: state.tasks.map((taskName) => taskName.id === taskId ? {...taskName, completed: !taskName.completed} : taskName)
        }))
    },
    togglePriorityStatus: (taskId) => {
        set((state) => ({
            tasks: state.tasks.map((taskName) => taskName.id === taskId ? {...taskName, priority: !taskName.priority} : taskName)
        }))
    },
    filteredTasks: [],
    filterTasks: (filter) => {
        switch(filter){
            case 'completed':
                set((state) => ({
                    filteredTasks: state.tasks.filter((task) => task.completed === true )
                }))
            break;
            case 'uncompleted':
                set((state) => ({
                    filteredTasks: state.tasks.filter((task) => task.completed === false)
                }))
            break;
            default:
                set((state) => ({
                    filteredTasks: state.tasks
                }))
            break;
        }
    }
})

const useTaskStore = create(
    devtools(
        persist(taskStore, {
            name: "tasks"
        })
    )
)

export default useTaskStore;
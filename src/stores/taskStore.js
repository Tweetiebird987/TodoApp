import create from "zustand";

import {devtools, persist} from "zustand/middleware"

const taskStore = (set) => ({
    tasks: [],
    // Add the selected task to the list
    addTask: (taskName) => { 
        set((state) => ({
            tasks: [taskName, ...state.tasks],
        }))
    },
    // Remove the selected task from the list
    removeTask: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((taskName) => taskName.id !== taskId)
        }))
    },
    // Toggle the completed property of the selected task
    toggleTaskStatus: (taskId) => {
        set((state) => ({
            tasks: state.tasks.map((taskName) => taskName.id === taskId ? {...taskName, completed: !taskName.completed} : taskName)
        }))
    },
    // Toggle the priority property of the selected task and then sort the whole task list such that priority tasks are first
    togglePriorityStatus: (taskId) => {
        set((state) => ({
            tasks: state.tasks.map((taskName) => taskName.id === taskId ? {...taskName, priority: !taskName.priority} : taskName)
                .sort(function(a, b){return Number(b.priority) - Number(a.priority)})
        }))
    },
    filteredTasks: [],
    // Filter the list of tasks by the given filter
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

// Create the Task store and save the tasks into the local storage of the web app
const useTaskStore = create(
    devtools(
        persist(taskStore, {
            name: "tasks"
        })
    )
)

export default useTaskStore;
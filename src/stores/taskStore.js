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
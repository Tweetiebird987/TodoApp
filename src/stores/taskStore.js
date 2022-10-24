import create from "zustand";

import {devtools, persist} from "zustand/middleware"

const taskStore = (set) => ({
    tasks: [],
    addTask: (task) => { 
        set((state) => ({
            tasks: [task, ...state.tasks],
        }))
    },
    removeTask: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId)
        }))
    },
    toggleTaskStatus: (taskId) => {
        set((state) => ({
            tasks: state.tasks.map((task) => task.id === taskId ? {...task, completed: !task.completed} : task)
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
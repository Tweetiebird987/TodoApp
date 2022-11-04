import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event'

import TaskForm from './TaskForm'

test("task input should be rendered", () => {
    render(<TaskForm />)
    const taskInputEl = screen.getByRole("textbox")
    expect(taskInputEl).toBeInTheDocument()
})

test("filter list should be rendered", () => {
    render(<TaskForm />)
    const filterEl = screen.getByRole("combobox")
    expect(filterEl).toBeInTheDocument()
})

test("task input should be empty", () => {
    render(<TaskForm />)
    const taskInputEl = screen.getByRole("textbox")
    expect(taskInputEl.value).toBe("")
})

test("task input should change", () => {
    render(<TaskForm />)
    const taskInputEl = screen.getByRole("textbox")
    const testValue = "test"

    fireEvent.change(taskInputEl, {target:{value:testValue}})
    expect(taskInputEl.value).toBe(testValue)
})

test("filter list should change", async () => {
    render(<TaskForm />)
    const filterEl = screen.getByRole("combobox")

    const filterOptions = ['all', 'completed', 'uncompleted']

    filterOptions.forEach(async (filter) => {

        fireEvent.change(filterEl,{target:{value:filter}})

        expect(filterEl.value).toBe(filter)
    })
})

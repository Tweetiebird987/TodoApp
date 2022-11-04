import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import App from './App'

describe('App', () => {
    it('Renders Title', () => {
        render(<App />);
        const title = screen.getByText(/Arnold's Task List/i);
        expect(title).toBeInTheDocument();
    })

test('Task is added to list', () => {
    render(<App />);
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValue = 'createTest'

    fireEvent.change(taskInputEl, {target:{value:testValue}})
    fireEvent.click(submitButtonEl)

    const taskEl = screen.getByTestId(testValue+ " Task")

    expect(taskEl.textContent).toBe(testValue)
})

test('Task is deleted from the list', () => {
    render(<App />);
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")
    const listEl = screen.getByRole("list")

    const testValue = 'deleteTest'

    fireEvent.change(taskInputEl, {target:{value:testValue}})
    fireEvent.click(submitButtonEl)

    const deleteButtonEl = screen.getByTestId(testValue+" DeleteBtn")
    fireEvent.click(deleteButtonEl)

    expect(listEl.lastChild.textContent).not.toBe(testValue)
})
})
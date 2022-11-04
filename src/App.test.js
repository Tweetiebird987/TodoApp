import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event'

import App from './App'

test('Renders Title', () => {
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

test('Task status does toggle', () => {
    render(<App />);
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValue = 'completeTest'

    fireEvent.change(taskInputEl, {target:{value:testValue}})
    fireEvent.click(submitButtonEl)

    const taskEl = screen.getByTestId(testValue + " Task")
    const statusButtonEl = screen.getByTestId(testValue+" StatusBtn")

    var completed = ((taskEl.getAttribute('class').includes('todo-item')) ? false : true)

    for(var x = 0; x<2;x++)
    {
        fireEvent.click(statusButtonEl)

        if(completed)
        {
            expect(taskEl.getAttribute('class')).not.toContain("completed")
        } else{
            expect(taskEl.getAttribute('class')).toContain("completed")
        }
        completed = !completed
    }
})

test('Task List filters correctly', async () => {
    render(<App />)
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValues = ['filterTestCompleted', 'filterTestUncompleted']

    testValues.forEach(testValue => {
        fireEvent.change(taskInputEl, {target:{value:testValue}})
        fireEvent.click(submitButtonEl)
    })

    const statusButtonEl = screen.getByTestId(testValues[0]+" StatusBtn")
    fireEvent.click(statusButtonEl)

    const filterEl = screen.getByRole("combobox")

    const filterOptions = ['all', 'completed', 'uncompleted']

    filterOptions.forEach(async (filter) => {

        fireEvent.change(filterEl,{target:{value:filter}})

        const taskList = screen.getAllByRole('listitem')

        switch(filter){
            case 'completed':
                taskList.forEach(task => {
                    if(task.textContent.includes('filter')) {
                        expect(task.getAttribute('class')).toContain("completed")
                    }
                })
            break;
            case 'uncompleted':
                taskList.forEach(async(task) => {
                    // console.log(task.getAttribute('class'))
                    if(task.textContent.includes('filter')){
                        expect(task.getAttribute('class')).not.toContain("completed")
                    }
                })
            break;
            default:
                var count = 0;
                taskList.forEach(task => {
                    if(task.textContent.includes('filter')){count++}
                })                
                
                expect(count).toBe(testValues.length)
            break;
        }
    })
})
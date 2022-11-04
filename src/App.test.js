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

    // Create a task called createTest
    fireEvent.change(taskInputEl, {target:{value:testValue}})
    fireEvent.click(submitButtonEl)

    // Check if the task was added and has the right data
    const taskEl = screen.getByTestId(testValue+ " Task")

    expect(taskEl.textContent).toBe(testValue)
})

test('Task is deleted from the list', () => {
    render(<App />);
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")
    const listEl = screen.getByRole("list")

    const testValues = ['deleteTest', 'dontDelete', 'dontDelete2']

    // Create a task for each element in the testValues array
    for(const testValue of testValues){
        fireEvent.change(taskInputEl, {target:{value:testValue}})
        fireEvent.click(submitButtonEl)
    }
    
    // Click the delete button
    const deleteButtonEl = screen.getByTestId(testValues[0]+" DeleteBtn")
    fireEvent.click(deleteButtonEl)

    // Search through the all of the child nodes of the list to make sure the task was deleted
    listEl.childNodes.forEach((child) => {
        expect(child.textContent).not.toContain(testValues[0])
    })
})

// Test that when the completed button is pressed then the task does toggle between completed and uncompleted
test('Task status does toggle', () => {
    render(<App />);
    
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValue = 'completeTest'

    // Create a task called completeTest
    fireEvent.change(taskInputEl, {target:{value:testValue}})
    fireEvent.click(submitButtonEl)

    const taskEl = screen.getByTestId(testValue + " Task")
    const statusButtonEl = screen.getByTestId(testValue+" StatusBtn")

    var completed = ((taskEl.getAttribute('class').includes('todo-item')) ? false : true)

    // Click the completed button twice to make sure it goes between completed and uncompleted
    for(var x = 0; x<2;x++)
    {
        // Click the complete button and then check if the attribute did change
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

    // Create tasks for each element in the testValues array
    testValues.forEach(testValue => {
        fireEvent.change(taskInputEl, {target:{value:testValue}})
        fireEvent.click(submitButtonEl)
    })

    // Change the status of one of the tasks
    const statusButtonEl = screen.getByTestId(testValues[0]+" StatusBtn")
    fireEvent.click(statusButtonEl)

    const filterEl = screen.getByRole("combobox")

    const filterOptions = ['all', 'completed', 'uncompleted']

    // Cycle through all the filter options and make sure the filtering works
    filterOptions.forEach(async (filter) => {

        fireEvent.change(filterEl,{target:{value:filter}})

        const taskList = screen.getAllByRole('listitem')

        switch(filter){
            case 'completed':
                taskList.forEach(task => {
                    // Only look at the tasks that have filter in name
                    if(task.textContent.includes('filter')) {
                        expect(task.getAttribute('class')).toContain("completed")
                    }
                })
            break;
            case 'uncompleted':
                taskList.forEach(async(task) => {
                    if(task.textContent.includes('filter')){
                        expect(task.getAttribute('class')).not.toContain("completed")
                    }
                })
            break;
            default:
                var count = 0;
                taskList.forEach(task => {
                    // Only count the tasks that have filter in name
                    if(task.textContent.includes('filter')){count++}
                })                
                
                expect(count).toBe(testValues.length)
            break;
        }
    })
})
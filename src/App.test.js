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

// Test that the list is filtered to show the correctly selected tasks
test('Task List filters correctly', () => {
    render(<App />)
    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValues = ['filterTestCompleted', 'filterTestUncompleted']

    // Create tasks for each element in the testValues array
    testValues.forEach(testValue => {
        fireEvent.change(taskInputEl, {target:{value:testValue}})
        fireEvent.click(submitButtonEl)
    })

    const taskTotal = screen.getAllByRole('listitem').length

    // Change the status of one of the tasks
    const statusButtonEl = screen.getByTestId(testValues[0]+" StatusBtn")
    fireEvent.click(statusButtonEl)

    const filterEl = screen.getByRole("combobox")

    const filterOptions = ['all', 'completed', 'uncompleted']

    // Cycle through all the filter options and make sure the filtering works
    filterOptions.forEach(filter => {

        fireEvent.change(filterEl,{target:{value:filter}})

        const taskList = screen.getAllByRole('listitem')

        switch(filter){
            case 'completed':
                taskList.forEach(task => {
                    expect(task.getAttribute('class')).toContain("completed")
                })
            break;
            case 'uncompleted':
                taskList.forEach(task => {
                    expect(task.getAttribute('class')).not.toContain("completed")
                })
            break;
            default:            
                expect(taskList.length).toBe(taskTotal)
            break;
        }
    })
})

// Test that priority is sent to the top of the list
test("Task with priority is at the top", () => {
    render(<App />)

    const taskInputEl = screen.getByRole("textbox")
    const submitButtonEl = screen.getByTestId("SubmitBtn")

    const testValues = ['priorityTestOn', 'priorityTestOff']

    // Create tasks for each element in the testValues array
    testValues.forEach(testValue => {
        fireEvent.change(taskInputEl, {target:{value:testValue}})
        fireEvent.click(submitButtonEl)
    })

    // Change the priority of one of the tasks
    const priorityButtonEl = screen.getByTestId(testValues[0]+" PriorityBtn")
    fireEvent.click(priorityButtonEl)

    const taskList = screen.getAllByTestId(/PriorityBtn/i)

    // Count how many times the priority switches
    var curPriority = true
    var prevPriority = false
    var swaps = 0
    for(var i = 0; i < taskList.length; i++){
        prevPriority = curPriority
        curPriority = taskList[i].getAttribute('class').includes('priority-on')

        if(curPriority !== prevPriority){
            swaps++
        }
    }

    // If all the priority tasks are at the top then there should only be one swap
    expect(swaps).toBe(1)
})
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import App from './App'

describe('App', () => {
    it('Renders Title', () => {
        render(<App />);
        const title = screen.getByText(/Arnold's Task List/i);
        expect(title).toBeInTheDocument();
    })
    it('Renders Form', () => {
        render(<App />)
        const form = screen.getByRole("textbox")
        expect(form).toBeInTheDocument();
    })
})
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "../pages/Home/Home";

test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Veranstaltungen/i);
    expect(linkElement).toBeInTheDocument();
});
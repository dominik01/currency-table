import React from "react";
import { render, screen } from '@testing-library/react';
import App from "../App";


it("renders", () => {
    render(<App/>)
})

it('renders with loading message', () => {
    render(<App />);
    expect(screen.getByText('Loading currencies...')).toBeInTheDocument();
});


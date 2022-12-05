import NavBar from './NavBar';
import { render, screen } from "@testing-library/react";
import { expect } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar component', () => {
  test('it should render a logout button when logged in', () => {
    render (
      <NavBar/>
    )
    expect(screen.getByText('Logout')).toBeInTheDocument();
  })
  test('it should render the VaKay logo', () => {
    //test
  })
  test('it should display the user profile pic or default profile logo', () => {
    //test
  })
})
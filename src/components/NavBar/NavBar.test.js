import NavBar from './NavBar';
import { render, screen } from "@testing-library/react";
import { expect } from '@jest/globals';

describe('NavBar component', () => {
  test('it should render a logout button when logged in', () => {
    render (
      <NavBar/>
    )
    expect(screen.getByText('Logout')).toBeDefined();
  })
  // test('it should render the VaKay logo', () => {
  //   render (
  //     <NavBar />
  //   )
  //})

})
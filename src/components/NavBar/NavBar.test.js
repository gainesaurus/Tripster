import NavBar from './NavBar';
import { render, screen } from "@testing-library/react";
import { expect } from '@jest/globals';
import { UserProvider } from '../../Contexts/UserContext';

describe('NavBar component', () => {
  test('it should render a logout button when logged in', () => {

    render (
      <UserProvider>
        <NavBar />
      </UserProvider>
    )
    expect(screen.getByText('Logout')).toBeDefined();
  })
  // test('it should render the VaKay logo', () => {
  //   const userContext {

  //   }

  //   // render (
  //   //   <UserContext.Provider value={{ userContext }}>
  //   //     <NavBar />
  //   //   </UserContext.Provider>
  //   // )
  // })

})
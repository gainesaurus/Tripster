import NavBar from './NavBar';
import { render, screen } from "@testing-library/react";
import { expect } from '@jest/globals';
import { useUserContext } from '../../Contexts/UserContext';

describe('NavBar component', () => {
  test('it should render a logout button when logged in', () => {
    const userContext = useUserContext();

    render (
      <UserProvider.Provider userContext={{ userContext }}>
        <NavBar />
      </UserProvider.Provider>
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
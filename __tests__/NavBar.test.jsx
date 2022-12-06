import NavBar from '../src/components/NavBar/NavBar';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from '@jest/globals';
import * as nextRouter from 'next/router';
import { UserProvider } from '../src/Contexts/UserContext';
import { act } from 'react-dom/test-utils';

describe('NavBar component', () => {
  beforeAll(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ query: { id: '1' } }));
  });

  it('should render a logout button and call router on click', async () => {
    const pushMock = jest.fn()
    nextRouter.useRouter.mockReturnValue({
      push: pushMock,
    })
    render (
      <UserProvider>
        <NavBar />
      </UserProvider>
    )

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeDefined();
      expect(nextRouter.useRouter).toHaveBeenCalled();
    })
  })

  it('should render the VaKay logo and call router on click', async () => {
    const pushMock = jest.fn()
    nextRouter.useRouter.mockReturnValue({
      push: pushMock,
    })
    render (
      <UserProvider>
        <NavBar />
      </UserProvider>
    )
    const logo = screen.getByAltText('vakay logo');
    expect(logo).toBeDefined();

    fireEvent.click(logo);
    await waitFor(() => {
      expect(nextRouter.useRouter).toHaveBeenCalled();
    })
  })

  it('should render a default profile pic', async () => {
    render (
      <UserProvider>
        <NavBar />
      </UserProvider>
    )
      const defaultIcon = screen.getByTestId('default-profile');
      expect(defaultIcon).toBeDefined();

    fireEvent.click(defaultIcon);
    await waitFor(() => {
      expect(nextRouter.useRouter).toHaveBeenCalled();
    })
  })
  it('should render a user provided profile pic when available', () => {
    const userContext = {
      authUser: {
        profile_pic: '/anImage.png',
        uid:1,
        token:2
      },
      isLoading: false,
    }
    render (
      <UserProvider user={{userContext}}>
        <NavBar />
      </UserProvider>
    )
      const defaultLogo = screen.getByTestId('default-profile');
      expect(defaultLogo).toBeDefined();
      //THIS SHOULD FAIL
  })
})
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import { TripsProvider } from '../src/Contexts/TripsContext';
import { UserProvider } from '../src/Contexts/UserContext';

describe('Create trip from', () => {
  beforeAll(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ query: { id: '1' } }));
  });

  it('renders all inputs', async () => {
    render(
      <UserProvider>
        <TripsProvider>
          <CreateTripForm closeForm={() => {}} />
        </TripsProvider>
      </UserProvider>,
    );
    const tripName = await screen.findByPlaceholderText(/Trip Name/);
    const startDate = await screen.findByPlaceholderText(/Start/);
    const endDate = await screen.findByPlaceholderText(/End/);
    const btnsInvite = await screen.findAllByText(/Invite friends/, {
      selector: 'button',
    });
    const btnCreate = await screen.findByText(/Create trip/);
    expect(tripName).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(btnsInvite.length).toBe(2);
    expect(btnsInvite[0]).toBeInTheDocument();
    expect(btnsInvite[1]).toBeInTheDocument();
    expect(btnCreate).toBeInTheDocument();
  });
});

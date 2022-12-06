import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import AddLodgingForm from '../src/components/AddLodgingForm/AddLodgingForm';
import { UserProvider } from '../src/Contexts/UserContext';

describe('Add pin drop from', () => {
  beforeAll(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ query: { id: '1' } }));
  });

  it('renders all inputs', async () => {
    render(
      <UserProvider>
        <AddLodgingForm closeForm={() => {}} />
      </UserProvider>,
    );
    const placeName = await screen.findByPlaceholderText(/What do you want to call this place?/);
    const mapInput = await screen.findByPlaceholderText(/Search for your place./);

    expect(placeName).toBeInTheDocument();
    expect(mapInput).toBeInTheDocument();
  });
});

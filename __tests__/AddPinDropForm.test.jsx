import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import AddPinDropForm from '../src/components/AddPinDropForm/AddPinDropForm';
import { UserProvider } from '../src/Contexts/UserContext';

describe('Add pin drop from', () => {
  beforeAll(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ query: { id: '1' } }));
  });

  it('renders all inputs', async () => {
    render(
      <UserProvider>
        <AddPinDropForm closeForm={() => {}} />
      </UserProvider>,
    );
    const addInfo = await screen.findByPlaceholderText(/Add some info.../);
    const mapInput = await screen.findByPlaceholderText(/Where is it?/);

    expect(addInfo).toBeInTheDocument();
    expect(mapInput).toBeInTheDocument();
  });
});

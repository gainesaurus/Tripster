import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import AddPhotosForm from '../src/components/AddPhotosForm/AddPhotosForm';
import { UserProvider } from '../src/Contexts/UserContext';

describe('Add pin drop from', () => {
  beforeAll(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ query: { id: '1' } }));
  });

  it('renders all inputs', async () => {
    render(
      <UserProvider>
        <AddPhotosForm closeForm={() => {}} />
      </UserProvider>,
    );
    const photoInput = await screen.findByTestId('filepond-input');
    expect(photoInput).toBeInTheDocument();
    expect(photoInput).toHaveClass('filepond--wrapper');
  });
});

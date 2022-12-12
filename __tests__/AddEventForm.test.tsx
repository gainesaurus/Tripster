import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UserProvider } from '../src/Contexts/UserContext';
import AddEventForm from '../src/components/AddEventForm/AddEventForm';


describe('Add Event Form', () => {
  it('renders all input fields', async () => {
    render(
      <UserProvider>
        <AddEventForm />
      </UserProvider>
    );
    const eventName = await screen.findByPlaceholderText(/Name of the Event.../);
    const startTime = await screen.findByTestId('startTime');
    const endTime = await screen.findByTestId('endTime');
    const eventType = await screen.findByText('other');
    const eventInfo = await screen.findByPlaceholderText(/What do we need to know.../);
    
    expect(eventName).toBeInTheDocument();
    expect(startTime).toBeInTheDocument();
    expect(endTime).toBeInTheDocument();
    expect(eventType).toBeInTheDocument();
    expect(eventInfo).toBeInTheDocument();
  });

  it('renders all buttons', async () => {
    render(
      <UserProvider>
      <AddEventForm />
    </UserProvider>
    );
    const closeBtn = await screen.getByTestId('closebtn');
    const saveBtn = await screen.getByTestId('savebtn');
    expect(closeBtn).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
});
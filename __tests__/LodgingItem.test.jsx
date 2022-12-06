import '@testing-library/jest-dom';
import LodgingItem from '../src/components/LodgingItem/LodgingItem';
import { render, screen } from "@testing-library/react";
import { expect } from '@jest/globals';

describe('LodgingItem Component', () => {
  it('it should render a get directions button and lodging info', () => {
    const lodge = {
      title: 'testTitle',
      address: 'testAddress',
      latLng: {
        lat: 10,
        lng: -10,
      }
    }
    render(
      <LodgingItem lodge={lodge}/>
    )
    expect(screen.getByText('Get directions')).toBeDefined();
    expect(screen.getByText('testTitle')).toBeDefined();
    expect(screen.getByText('testAddress')).toBeDefined();
  });
});
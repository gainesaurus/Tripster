import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  TimeLineMocks,
} from './TimeLineMocks';
import TimeLineList from './TimeLineList';
import { UserProvider } from "../../Contexts/UserContext";

let mockFunction;

beforeEach(() => {
  mockFunction = jest.fn();
});

describe("TimeLineList Tests", () => {

  it("Should render an event with the correct details", () => {
    render(
      <UserProvider>
        <TimeLineList tripId='101' allEvents={TimeLineMocks} />
      </UserProvider>
    );

    const eventsSet = new Set([...TimeLineMocks.map(event => event.title)]);
    const timeline = screen.getByTestId('timelineContainer');
    const events = timeline.querySelectorAll('[data-testid="eventDay"]');
    expect(events.length).toBe(TimeLineMocks.length);

    events.forEach((event) => {
      const eventTitle = event.querySelector('[data-testid="eventTitle"')?.innerHTML;
      expect(eventsSet.has(eventTitle!)).toBeTruthy();
    })
  });

  it("Should not render anything if the timeline is empty", () => {
    render(
      <UserProvider>
        <TimeLineList tripId='102' allEvents={TimeLineMocks} />
      </UserProvider>
    );
    const timeline = screen.getByTestId('timelineContainer');
    expect(timeline.querySelector('.eventDay')).toBeNull();
  });
});
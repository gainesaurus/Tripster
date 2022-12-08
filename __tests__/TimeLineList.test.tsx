import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  TimeLineMocks,
} from '../src/components/TimeLineList/TimeLineMocks';
import TimeLineList from '../src/components/TimeLineList/TimeLineList';
import { UserProvider } from "../src/Contexts/UserContext";

describe("TimeLineList Tests", () => {

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
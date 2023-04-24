import { fireEvent, screen, render } from "@testing-library/react";
import { within } from "@testing-library/dom";

import Events from "../Events";

describe("Test Events component is correctly displayed", () => {
  it("should display events component elements", () => {
    render(<Events />);

    expect(screen.getByTestId("events-component")).toBeVisible();

    expect(screen.getByTestId("create-event-button")).toBeVisible();

    expect(screen.getByTestId("attendance-select")).toBeVisible();

    expect(screen.getAllByTestId("single-event-component")).toHaveLength(3);
  });

  it("should display correct data for first single event", () => {
    render(<Events />);

    const firstEventData = {
      date: "24/4/2023",
      location: "at: Cinema32",
      title: "Cinema Night!",
      attendance: "46 interested... 27 going...",
    };

    const firstSingleEvent = screen.getAllByTestId("single-event-component")[0];

    const dateText = within(firstSingleEvent).getByTestId("single-event-date");
    expect(dateText).toHaveTextContent(firstEventData["date"]);

    const locationText = within(firstSingleEvent).getByTestId(
      "single-event-location"
    );
    expect(locationText).toHaveTextContent(firstEventData["location"]);

    const titleText =
      within(firstSingleEvent).getByTestId("single-event-title");
    expect(titleText).toHaveTextContent(firstEventData["title"]);

    const attendanceText = within(firstSingleEvent).getByTestId(
      "single-event-attendance"
    );
    expect(attendanceText).toHaveTextContent(firstEventData["attendance"]);
  });

  it("should display correct data for second single event", () => {
    render(<Events />);

    const secondEventData = {
      date: "24/4/2023",
      location: "at: Bulldog Bar",
      title: "Pub Crawl",
      attendance: "52 interested... 38 going...",
    };

    const firstSingleEvent = screen.getAllByTestId("single-event-component")[1];

    const dateText = within(firstSingleEvent).getByTestId("single-event-date");
    expect(dateText).toHaveTextContent(secondEventData["date"]);

    const locationText = within(firstSingleEvent).getByTestId(
      "single-event-location"
    );
    expect(locationText).toHaveTextContent(secondEventData["location"]);

    const titleText =
      within(firstSingleEvent).getByTestId("single-event-title");
    expect(titleText).toHaveTextContent(secondEventData["title"]);

    const attendanceText = within(firstSingleEvent).getByTestId(
      "single-event-attendance"
    );
    expect(attendanceText).toHaveTextContent(secondEventData["attendance"]);
  });

  it("should display correct data for third single event", () => {
    render(<Events />);

    const thirdEventData = {
      date: "24/4/2023",
      location: "at: Mini golf park",
      title: "Mini golf!",
      attendance: "106 interested... 78 going...",
    };

    const firstSingleEvent = screen.getAllByTestId("single-event-component")[2];

    const dateText = within(firstSingleEvent).getByTestId("single-event-date");
    expect(dateText).toHaveTextContent(thirdEventData["date"]);

    const locationText = within(firstSingleEvent).getByTestId(
      "single-event-location"
    );
    expect(locationText).toHaveTextContent(thirdEventData["location"]);

    const titleText =
      within(firstSingleEvent).getByTestId("single-event-title");
    expect(titleText).toHaveTextContent(thirdEventData["title"]);

    const attendanceText = within(firstSingleEvent).getByTestId(
      "single-event-attendance"
    );
    expect(attendanceText).toHaveTextContent(thirdEventData["attendance"]);
  });
});

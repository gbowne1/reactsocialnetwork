import { screen } from "@testing-library/react";
import { renderCreateEventModal } from "../../../../utils/renderComponent";

describe("Test CreateEventModal is correctly displayed", () => {
  it("should display create event modal elements", () => {
    renderCreateEventModal();

    expect(screen.getByTestId("create-event-modal")).toBeVisible();

    expect(screen.getByTestId("event-title-input")).toBeVisible();

    expect(screen.getByTestId("event-location-input")).toBeVisible();

    expect(screen.getByTestId("event-location-url-input")).toBeVisible();

    expect(screen.getByTestId("event-image-url-input")).toBeVisible();

    // Use label to find CreateEventModal date picker since Datepicker cannot
    // have IDs associated to it.
    expect(screen.getByLabelText("Event date")).toBeVisible();
  });
});

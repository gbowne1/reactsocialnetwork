import { screen, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/react";
import { renderSingleEvent } from "../../../../utils/renderComponent";

describe("Test SingleEvent component functionality", () => {
    it("should have attendance filter working correctly", async () => {
        const { eventData } = renderSingleEvent();

        // Check initial value of attendance filter.
        let attendanceFilter = screen.getByTestId("attendance-select");
        expect(attendanceFilter).toBeVisible();
        expect(attendanceFilter).toHaveTextContent(eventData.attendance);

        // Change attendance filter.
        fireEvent.mouseDown(
            await within(attendanceFilter).findByRole("button")
        );
        let listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Going$/i));

        // Check text of attendance filter changed.
        expect(attendanceFilter).toHaveTextContent("Going");

        // Change value of attendance filter.
        fireEvent.mouseDown(
            await within(attendanceFilter).findByRole("button")
        );
        listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Interested$/i));

        // Check text of attendance filter changed.
        expect(attendanceFilter).toHaveTextContent("Interested");

        // Change value of attendance filter.
        fireEvent.mouseDown(
            await within(attendanceFilter).findByRole("button")
        );
        listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Not Going$/i));

        // Check text of attendance filter changed.
        expect(attendanceFilter).toHaveTextContent("Not Going");
    });

    it("should have share button working correctly", () => {});

    it("should have delete button working correctly", () => {
        const { mockSetSnackbarOptions, mockSetOpenSnackbar } =
            renderSingleEvent();

        const fakeResponse = {
            message: "Event successfully deleted!",
            rows: [],
        };
        const mockedFetch = jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(fakeResponse),
        });

        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);

        expect(mockedFetch).toHaveBeenCalled();

        // Check setSnackbarOptions was called.
        expect(mockSetSnackbarOptions.mock.calls).toHaveLength(1);

        // Check setOpenSnackbar was called.
        expect(mockSetOpenSnackbar.mock.calls).toHaveLength(1);
    });
});

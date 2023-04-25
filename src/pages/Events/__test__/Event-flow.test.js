import { fireEvent, screen, render } from "@testing-library/react";
import { within } from "@testing-library/dom";

import Events from "../Events";

describe("Test Events component creation success flow", () => {
  it("should successfully create a new event", async () => {
    render(<Events />);
  });
});

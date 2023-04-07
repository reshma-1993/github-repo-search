import React from "react";
import { render } from "@testing-library/react";
import LoadingDots from "../LoadingDots";

describe("LoadingDots component", () => {
  it("renders the correct number of dots", () => {
    const { getAllByTestId } = render(<LoadingDots />);
    const dots = getAllByTestId("loading-dot");
    expect(dots).toHaveLength(3);
  });

  it("renders the dots with the correct delay animation", () => {
    const { getAllByTestId } = render(<LoadingDots />);
    const dots = getAllByTestId("loading-dot");
    expect(dots[0]).toHaveStyle("animation-delay: 0s");
    expect(dots[1]).toHaveStyle("animation-delay: 0.1s");
    expect(dots[2]).toHaveStyle("animation-delay: 0.2s");
  });
});

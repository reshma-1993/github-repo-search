import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: { primary: "#faf4e4", secondary: "#19886b", tertiary: "#d1e7e1" },
  fontSizes: { title: "clamp(1.25rem, 5vw, 4rem)", body: "1rem" },
};

describe("Home component", () => {
  it("renders the title correctly", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    );
    const title = screen.getByText("Github Repository Search");
    expect(title).toBeInTheDocument();
  });

  it("renders the SearchBar component correctly", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    );
    const searchBar = screen.getByPlaceholderText("Search...");
    expect(searchBar).toBeInTheDocument();
  });
});
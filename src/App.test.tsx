import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from './App';

const theme = {
  colors: { primary: "#faf4e4", secondary: "#19886b", tertiary: "#d1e7e1" },
  fontSizes: { title: "clamp(1.25rem, 5vw, 4rem)", body: "1rem" },
};

describe("<App />", () => {
  test("Renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
  });
});
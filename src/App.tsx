import React from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyle, Theme } from "./globals/styles";
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "./components/Home";
import Results from "./components/Results";

import './App.css';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/search/:q" element={<Results />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

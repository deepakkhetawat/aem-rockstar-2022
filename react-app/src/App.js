/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from "react";
import LocaleContext from "./LocaleContext";
import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import logo from "./images/meclogo.png";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import { Link } from "react-router-dom";
import "./App.scss";


function App() {
const [locale, setLocale] = useState(useContext(LocaleContext).locale);

let productPath= `/product/:locale/:slug/`;
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header>
        <Link to={"/"}>
          <img src={logo} className="logo" alt="MEC Logo" />
        </Link>
          <hr />
        </header>
        <LocaleContext.Provider value={{locale, setLocale}}>
        <Routes>
          <Route path={productPath} element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
        </Routes>
       </LocaleContext.Provider>

      </div>
    </Router>
  );
}
export default App;

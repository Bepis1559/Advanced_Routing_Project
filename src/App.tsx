import { ReactElement } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
// import {  useNavigation } from "react-router-dom";

export function App(): ReactElement {
  // const { state } = useNavigation();

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      {/* {state == "loading" ? (
        <>
          <div className="loading-spinner"></div>
          <div className="container loading">
            <Outlet />
          </div>
        </>
      ) : ( */}
      <Outlet />
      {/* )} */}
    </>
  );
}

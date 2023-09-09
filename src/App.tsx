import { ReactElement } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useNavigation } from "react-router-dom";

export function App(): ReactElement {
  const { state } = useNavigation();

  const { VITE_usersURL, VITE_postsUrl, VITE_commentsUrl, VITE_todosUrl } =
    import.meta.env;

  console.log(VITE_usersURL, VITE_postsUrl, VITE_commentsUrl, VITE_todosUrl);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      {state == "loading" ? (
        <>
          <div className="loading-spinner"></div>
          <div className="container loading">
            <Outlet />
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

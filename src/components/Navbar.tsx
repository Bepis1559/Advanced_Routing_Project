import { ReactElement, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  postsEndPoint,
  usersEndPoint,
  todosEndPoint,
} from "../json/urlEndPoints.json";

export function Navbar(): ReactElement {
  const navLinks = useMemo(
    () => [
      {
        id: crypto.randomUUID(),
        value: "Posts",
        to: postsEndPoint,
      },
      {
        id: crypto.randomUUID(),
        value: "Users",
        to: usersEndPoint,
      },
      {
        id: crypto.randomUUID(),
        value: "Todos",
        to: todosEndPoint,
      },
    ],
    [],
  );
  return (
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        {navLinks.map(({ id, value, to }) => {
          return (
            <NavLink to={to} key={id}>
              {value}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}

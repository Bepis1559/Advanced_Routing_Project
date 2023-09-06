import { ReactElement, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  postsEndPoint,
  usersEndPoint,
  todosEndPoint,
} from "../json/urlEndPoints.json";
import { queryAtom, userIdAtom } from "../contexts/postsFilter";
import { useAtom } from "jotai";

export function Navbar(): ReactElement {
  const [, setQuery] = useAtom(queryAtom);
  const [, setUserId] = useAtom(userIdAtom);

  const navLinks = useMemo(
    () => [
      {
        value: "Posts",
        to: postsEndPoint,
        onClick: () => {
          setQuery("");
          setUserId("0");
        },
      },
      {
        value: "Users",
        to: usersEndPoint,
      },
      {
        value: "Todos",
        to: todosEndPoint,
      },
    ],
    [setQuery, setUserId],
  );
  return (
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        {navLinks.map(({ value, to, onClick }) => {
          return (
            <NavLink onClick={() => onClick?.()} to={to} key={value}>
              {value}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}

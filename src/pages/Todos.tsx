import { ReactElement } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

export function Todos(): ReactElement {
  let todos = useLoaderData() as todo[];
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  if (userId) {
    todos = todos.filter((todo) => todo.userId == Number(userId));
  }
  return (
    <>
      <h1 className="page-title p-5">Todos</h1>
      <ul>
        {todos.map(({ completed, title, id }) => (
          <li key={id} className={completed ? "strike-through" : ""}>
            {title}
          </li>
        ))}
      </ul>
    </>
  );
}

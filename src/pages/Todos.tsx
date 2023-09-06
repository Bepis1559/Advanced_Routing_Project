import { Suspense, type ReactElement } from "react";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

export function Todos(): ReactElement {
  const { todosPromise } = useLoaderData() as todosDeferredResult;
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <>
      <h1 className="page-title p-3">Todos</h1>
      <Suspense fallback={<>Loading...</>}>
        <Await resolve={todosPromise}>
          <TodosTexts userId={userId} />
        </Await>
      </Suspense>
    </>
  );
}

type todosTextsProps = {
  userId: string | null;
};

export function TodosTexts({ userId }: todosTextsProps): ReactElement {
  let todos = useAsyncValue() as todo[];
  if (userId) {
    todos = todos.filter((todo) => todo.userId == Number(userId));
  }
  return (
    <ul>
      {todos.map(({ completed, title, id }) => (
        <li key={id} className={completed ? "strike-through" : ""}>
          {title}
        </li>
      ))}
    </ul>
  );
}

import { ReactElement } from "react";
import { Form } from "react-router-dom";

type props = {
  userId: string;
  query: string;
  users: user[];
};

export function Filter({ users, userId, query }: props): ReactElement {
  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input defaultValue={query} type="search" name="query" id="query" />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select
            defaultValue={userId ?? ""}
            typeof="search"
            name="userId"
            id="userId">
            <option value="">Any</option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

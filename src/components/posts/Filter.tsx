import { ReactElement } from "react";
import { Form, useLoaderData } from "react-router-dom";

type useLoaderDataType = {
  posts: post[];
  users: user[];
};

export function Filter(): ReactElement {
  const { users } = useLoaderData() as useLoaderDataType;
  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select typeof="search" name="userId" id="userId">
            <option value="">Any</option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

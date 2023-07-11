import { ReactElement } from "react";
import { Form } from "react-router-dom";
import { FormGroup } from "./FormGroup";

type props = {
  userId: string;
  query: string;
};

export function Filter({ userId, query }: props): ReactElement {
  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input defaultValue={query} type="search" name="query" id="query" />
        </div>
        <FormGroup selectDefaultValue={userId ?? ""} />
        <button type="submit" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

import type { Dispatch, ReactElement, SetStateAction } from "react";
import { Form } from "react-router-dom";
import { FormGroup } from "./FormGroup";

type props = {
  userId: string;
  query: string;
  setArePostsGettingFiltered: Dispatch<SetStateAction<boolean>>;
};
export function Filter({
  userId,
  query,
  setArePostsGettingFiltered,
}: props): ReactElement {
  const handleSubmit = () => setArePostsGettingFiltered(true);
  return (
    <Form
      onSubmit={handleSubmit}
      method="get"
      action="/posts"
      className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input defaultValue={query} type="search" name="query" id="query" />
        </div>
        <FormGroup isAllOptionNeeded={true} selectDefaultValue={userId} />
        <button type="submit" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

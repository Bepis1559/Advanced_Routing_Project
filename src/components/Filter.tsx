import {
  useEffect,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import { Form } from "react-router-dom";
import { FormGroup } from "./FormGroup";
import { queryAtom } from "../contexts/postsFilter";
import { useAtom } from "jotai";

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
  const [inputQuery, setInputQuery] = useAtom(queryAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInputQuery(query), []);
  return (
    <Form
      onSubmit={handleSubmit}
      method="get"
      action="/posts"
      className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input
            onChange={(e) => setInputQuery(e.target.value)}
            value={inputQuery}
            // defaultValue={query}
            type="search"
            name="query"
            id="query"
          />
        </div>
        <FormGroup isAllOptionNeeded={true} userId={userId} />
        <button type="submit" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

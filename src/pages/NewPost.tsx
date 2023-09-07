import { ReactElement } from "react";
import {
  Form,
  Link,
  // useLocation,
  useNavigation,
} from "react-router-dom";
import { FormGroup } from "../components/FormGroup";

export function NewPost(): ReactElement {
  const { state } = useNavigation();

  const isSubmitting = state == "submitting" || state == "loading";

  return (
    <div className="container">
      <h1 className="page-title">Create POST</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input required type="text" name="title" id="title" />
          </div>
          <FormGroup isAllOptionNeeded={false} userId="1" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea required name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link relative="path" to={".."} className="btn btn-outline">
            Cancel
          </Link>
          <Link relative="path" to={".."}>
            <button disabled={isSubmitting} type="submit" className="btn">
              {isSubmitting ? "Loading" : "Create"}
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

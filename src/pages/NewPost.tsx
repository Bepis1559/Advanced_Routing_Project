import { ReactElement } from "react";
import { Form } from "react-router-dom";
import { FormGroup } from "../components/FormGroup";

type props = {
  users: user[];
};

export function NewPost({ users }: props): ReactElement {
  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
          </div>
          <FormGroup selectDefaultValue="1" users={users} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

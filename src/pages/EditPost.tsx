import { Suspense, type ReactElement } from "react";
import {
  Await,
  Form,
  Link,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";
import { FormGroup } from "../components/FormGroup";
import { CardSkeleton } from "../skeletons/CardSkeleton";

export function EditPost(): ReactElement {
  const { currentPostPromise, currentUserPromise } =
    useLoaderData() as postDeferredResult;

  return (
    <div className="container">
      <h1 className="page-title">Edit Post</h1>
      <Suspense fallback={<CardSkeleton />}>
        {/* <Await resolve={Promise.all([currentPostPromise, currentUserPromise])}> */}
        <Form method="post" action="/posts/new" className="form">
          <div className="form-row">
            <div className="form-group error">
              <label htmlFor="title">Title</label>
              <Await resolve={currentPostPromise}>
                <Input />
              </Await>
            </div>
            <Await resolve={currentUserPromise}>
              <FormGroupComponent />
            </Await>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <Await resolve={currentPostPromise}>
                <TextArea />
              </Await>
            </div>
          </div>
          <div className="form-row form-btn-row">
            <Link relative="path" to={".."} className="btn btn-outline">
              Cancel
            </Link>
            <Link relative="path" to={".."}>
              <button type="submit" className="btn">
                Save
              </button>
            </Link>
          </div>
        </Form>
        {/* </Await> */}
      </Suspense>
    </div>
  );
}

function Input(): ReactElement {
  const { title } = useAsyncValue() as post;
  return (
    <>
      <input
        defaultValue={title ?? ""}
        required
        type="text"
        name="title"
        id="title"
      />
    </>
  );
}
function FormGroupComponent(): ReactElement {
  const { id: userId } = useAsyncValue() as user;
  return (
    <>
      <FormGroup isAllOptionNeeded={false} userId={userId.toString() ?? "1"} />
    </>
  );
}

function TextArea(): ReactElement {
  const { body } = useAsyncValue() as post;
  return (
    <>
      <textarea
        defaultValue={body ?? ""}
        required
        name="body"
        id="body"></textarea>
    </>
  );
}

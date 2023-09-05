import { ReactElement } from "react";
import {
  Form,
  Link,
  useLoaderData,
  // useLocation,
  useNavigation,
} from "react-router-dom";
import { FormGroup } from "../components/FormGroup";
import { postLoaderDataType } from "./Post";

type props = {
  pageTitle: string;
};

export function NewPost({ pageTitle }: props): ReactElement {
  // console.log("Current URL:", location.pathname);
  const { state } = useNavigation();
  const data = useLoaderData() as postLoaderDataType;
  const title = data?.currentPost.title ?? "";
  const body = data?.currentPost.body ?? "";
  const userId = data?.currentUser.id ?? "1";

  const isSubmitting = state == "submitting" || state == "loading";

  return (
    <div className="container">
      <h1 className="page-title">{pageTitle}</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input
              defaultValue={title}
              required
              type="text"
              name="title"
              id="title"
            />
            {/* <div className="error-message">Required</div> */}
          </div>
          <FormGroup
            isAllOptionNeeded={false}
            selectDefaultValue={userId.toString()}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              defaultValue={body}
              required
              name="body"
              id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link
            relative="path"
            // onClick={(e) => {
            //   const link = e.currentTarget as HTMLAnchorElement;
            //   return console.log("Navigating to:", link.href);
            // }}
            to={".."}
            className="btn btn-outline">
            Cancel
          </Link>
          <Link relative="path" to={".."}>
            <button disabled={isSubmitting} type="submit" className="btn">
              {isSubmitting ? "Loading" : "Save"}
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

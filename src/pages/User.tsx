import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { postsEndPoint } from "../json/urlEndPoints.json";

type loaderDataType = [user, post[], todo[]];

export function User(): ReactElement {
  const [user, posts, todos] = useLoaderData() as loaderDataType;
  const {
    id,
    name,
    company: { name: companyName },
    website,
    email,
    address: { street, suite, city, zipcode },
  } = user as user;

  return (
    <main className="container">
      <h1 className="page-title">{name}</h1>
      <div className="page-subtitle">{email}</div>
      <div>
        <b>Company:</b> {companyName}
      </div>
      <div>
        <b>Website:</b> {website}
      </div>
      <div>
        <b>Address:</b> {`${street} ${suite}, ${city} , ${zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts?.map(({ userId, id: postId, title, body }) => {
          if (userId == id) {
            return (
              <div key={postId} className="card">
                <div className="card-header">{title}</div>
                <div className="card-body">
                  <div className="card-preview-text">{body}</div>
                </div>
                <div className="card-footer">
                  <Link
                    className="btn"
                    to={`${postsEndPoint}/${postId}/comments`}>
                    View
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos?.map((todo) => {
          return (
            <li
              className={todo.completed ? "strike-through" : ""}
              key={todo.id}>
              {todo.title}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

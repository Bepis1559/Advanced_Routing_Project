import { ReactElement } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { postsEndPoint } from "../json/urlEndPoints.json";
import { Filter } from "../components/posts/Filter";

type useLoaderDataType = {
  posts: post[];
  users: user[];
};

export function Posts(): ReactElement {
  let { posts } = useLoaderData() as useLoaderDataType;
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  if (userId) {
    posts = posts.filter((post) => post.userId == Number(userId));
  }
  return (
    <main className="container">
      <h1 className="page-title">Posts</h1>
      <Filter />
      <div className="card-grid">
        {posts.map(({ id, title, body }) => {
          return (
            <div key={id} className="card">
              <div className="card-header">{title}</div>
              <div className="card-body">
                <div className="card-preview-text">{body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`${postsEndPoint}/${id}/comments`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

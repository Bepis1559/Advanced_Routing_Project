import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { usersEndPoint } from "../json/urlEndPoints.json";
type loaderDataType = [user, post, comment[]];

// should have the post Title,the userName , post body , all related comments with their email and body
export function Post(): ReactElement {
  const [user, post, currentPostComments] = useLoaderData() as loaderDataType;
  const { name, id } = user;
  const { title, body: postBody } = post;
  return (
    <main className="container">
      <h1 className="page-title">{title}</h1>
      <span className="page-subtitle">
        By: <Link to={`${usersEndPoint}/${id}`}>{name}</Link>
      </span>
      <div>{postBody}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {currentPostComments.map(
          ({ email, body: emailBody, id: commentId }) => {
            return (
              <div key={commentId} className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">{email}</div>
                  {emailBody}
                </div>
              </div>
            );
          },
        )}
      </div>
    </main>
  );
}

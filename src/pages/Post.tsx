import { ReactElement, Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";
import { usersEndPoint } from "../json/urlEndPoints.json";
import { PostSkeleton } from "../skeletons/PostSkeleton";
export type postLoaderDataType = {
  currentUser: user;
  currentPost: post;
  currentPostComments: comment[];
};

export function Post(): ReactElement {
  const { currentPostPromise, currentUserPromise, allCommentsPromise } =
    useLoaderData() as postDeferredResult;

  return (
    <Suspense fallback={<PostSkeleton />}>
      <Await
        resolve={Promise.all([
          currentPostPromise,
          currentUserPromise,
          allCommentsPromise,
        ])}>
        <PostContent />
      </Await>
    </Suspense>
  );
}

type asyncValueType = [
  currentPost: post,
  currentUser: user,
  allComments: comment[],
];

function PostContent(): ReactElement {
  const [currentPost, currentUser, allComments] =
    useAsyncValue() as asyncValueType;
  const { name, id } = currentUser;
  const { id: postId, title, body: postBody } = currentPost;
  return (
    <main className="container">
      <h1 className="page-title">
        {title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${postId}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`${usersEndPoint}/${id}`}>{name}</Link>
      </span>
      <div>{postBody}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {allComments
          .filter((comment) => comment.postId == currentPost.id)
          ?.map(({ email, body: emailBody, id: commentId }) => {
            return (
              <div key={commentId} className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">{email}</div>
                  {emailBody}
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}

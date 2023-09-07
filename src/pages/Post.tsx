import { ReactElement, Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";
import { usersEndPoint } from "../json/urlEndPoints.json";
import { PostsSkeleton } from "../skeletons/PostsSkeleton";
export type postLoaderDataType = {
  currentUser: user;
  currentPost: post;
  currentPostComments: comment[];
};

// should have the post Title,the userName , post body , all related comments with their email and body
export function Post(): ReactElement {
  // const { currentUser, currentPost, currentPostComments } =
  //   useLoaderData() as postLoaderDataType;
  const { currentPostPromise, currentUserPromise, allCommentsPromise } =
    useLoaderData() as postDeferredResult;

  // const resolve = {
  //   currentPost: currentPostPromise,
  //   currentUser: currentUserPromise,
  //   allComments: allCommentsPromise,
  // };
  // console.log(resolve);
  // const { name, id } = currentUser;
  // const { id: postId, title, body: postBody } = currentPost;

  return (
    <Suspense fallback={<PostsSkeleton />}>
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

  // const { currentPost, currentUser, allComments } = useAsyncValue()
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

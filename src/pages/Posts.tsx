import { type ReactElement, Suspense, useEffect, useState } from "react";
import {
  Await,
  Link,
  useAsyncValue,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { Filter } from "../components/Filter";
import { Card } from "../components/Card";
import { PostsSkeleton } from "../skeletons/PostsSkeleton";

export function Posts(): ReactElement {
  const [arePostsGettingFiltered, setArePostsGettingFiltered] = useState(false);
  const { postsPromise } = useLoaderData() as postsDeferredResult;
  const searchParams = useSearchParams();
  const userId = searchParams[0].get("userId");
  const query = searchParams[0].get("query");

  useEffect(() => {
    setArePostsGettingFiltered(false);
  }, [postsPromise]);

  return (
    <main className="container">
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <Filter
        setArePostsGettingFiltered={setArePostsGettingFiltered}
        userId={userId ?? ""}
        query={query ?? ""}
      />
      {arePostsGettingFiltered ? (
        <div className="card-grid">
          <PostsSkeleton />
        </div>
      ) : (
        <div className="card-grid">
          <Suspense fallback={<PostsSkeleton />}>
            <Await resolve={postsPromise}>
              <PostsCards />
            </Await>
          </Suspense>
        </div>
      )}
    </main>
  );
}

function PostsCards(): ReactElement {
  const posts = useAsyncValue() as post[];

  return (
    <>
      {posts?.map(({ id, title, body }) => (
        <Card key={id} id={id} title={title} body={body} />
      ))}
    </>
  );
}

import { ReactElement, Suspense } from "react";
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
  // const { posts } = useLoaderData() as post[];
  const { postsPromise } = useLoaderData() as Record<string, Promise<post[]>>;
  const searchParams = useSearchParams();
  const userId = searchParams[0].get("userId");
  const query = searchParams[0].get("query");

  return (
    <main className="container">
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link
            // onClick={(e) => {
            //   const link = e.currentTarget as HTMLAnchorElement;
            //   return console.log("Navigating to:", link.href);
            // }}
            className="btn btn-outline"
            to="new">
            New
          </Link>
        </div>
      </h1>
      <Filter userId={userId ?? ""} query={query ?? ""} />
      <div className="card-grid">
        <Suspense fallback={<PostsSkeleton />}>
          <Await resolve={postsPromise}>
            <PostsCards />
          </Await>
        </Suspense>
      </div>
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

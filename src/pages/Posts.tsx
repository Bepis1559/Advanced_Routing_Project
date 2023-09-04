import { ReactElement, Suspense } from "react";
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Filter } from "../components/Filter";
import { Card } from "../components/Card";

export function Posts(): ReactElement {
  // const { posts } = useLoaderData() as useLoaderDataType;
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
        <Suspense fallback="Loading...">
          <Await resolve={postsPromise}>
            {(posts: post[]) =>
              posts?.map(({ id, title, body }) => {
                return <Card key={id} id={id} title={title} body={body} />;
              })
            }
          </Await>
        </Suspense>
      </div>
    </main>
  );
}

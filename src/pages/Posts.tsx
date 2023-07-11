import { ReactElement } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Filter } from "../components/Filter";
import { Card } from "../components/Card";

type useLoaderDataType = {
  posts: post[];
  users: user[];
};

export function Posts(): ReactElement {
  const { posts } = useLoaderData() as useLoaderDataType;
  const searchParams = useSearchParams();
  const userId = searchParams[0].get("userId");
  const query = searchParams[0].get("query");

  console.log(posts);
  console.log(userId);

  return (
    <main className="container">
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>
      <Filter userId={userId ?? ""} query={query ?? ""} />
      <div className="card-grid">
        {posts?.map(({ id, title, body }) => {
          return <Card key={id} id={id} title={title} body={body} />;
        })}
      </div>
    </main>
  );
}

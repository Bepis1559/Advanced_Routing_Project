import { ReactElement } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Filter } from "../components/posts/Filter";
import { Card } from "../components/Card";

type useLoaderDataType = {
  posts: post[];
  users: user[];
};

export function Posts(): ReactElement {
  const { users, posts } = useLoaderData() as useLoaderDataType;
  const searchParams = useSearchParams();
  const userId = searchParams[0].get("userId");
  const query = searchParams[0].get("query");

  return (
    <main className="container">
      <h1 className="page-title">Posts</h1>
      <Filter userId={userId ?? ""} query={query ?? ""} users={users} />
      <div className="card-grid">
        {posts?.map(({ id, title, body }) => {
          return <Card key={id} id={id} title={title} body={body} />;
        })}
      </div>
    </main>
  );
}

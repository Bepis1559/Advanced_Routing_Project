import { ReactElement, Fragment, Suspense } from "react";
import "../App.css";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { usersEndPoint } from "../json/urlEndPoints.json";
import { PostsSkeleton } from "../skeletons/PostsSkeleton";
export function Users(): ReactElement {
  const { usersPromise } = useLoaderData() as usersDeferredResult;

  return (
    <main className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <Suspense fallback={<PostsSkeleton />}>
          <Await resolve={usersPromise}>
            <UsersCards />
          </Await>
        </Suspense>
      </div>
    </main>
  );
}

function UsersCards(): ReactElement {
  const users = useAsyncValue() as user[];
  return (
    <>
      {users?.map(
        ({ id, name, company: { name: companyName }, website, email }) => {
          return (
            <Fragment key={id}>
              <div className="card">
                <div className="card-header">{name}</div>
                <div className="card-body">
                  <div>{companyName}</div>
                  <div>{website}</div>
                  <div>{email}</div>
                </div>
                <div className="card-footer">
                  <Link to={`${usersEndPoint}/${id}`} className="btn">
                    View
                  </Link>
                </div>
              </div>
            </Fragment>
          );
        },
      )}
    </>
  );
}

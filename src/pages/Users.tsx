import { ReactElement, Fragment } from "react";
import "../App.css";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { usersEndPoint } from "../json/urlEndPoints.json";
export function Users(): ReactElement {
  const users = (useLoaderData() as user[]) ?? [];

  return (
    <main className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
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
      </div>
    </main>
  );
}

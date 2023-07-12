import { ReactElement } from "react";
import { postsEndPoint } from "../json/urlEndPoints.json";
import { Link } from "react-router-dom";

type props = {
  id: number;
  title: string;
  body: string;
};

export function Card({ id, title, body }: props): ReactElement {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`${postsEndPoint}/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}

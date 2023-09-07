import { ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

export function PostSkeleton(): ReactElement {
  return (
    <main className="container">
      <Skeleton
        style={{ float: "right", borderRadius: ".5em" }}
        height={"2.5em"}
        width={"7%"}
      />
      <Skeleton height={"1.5em"} width={"20%"} />

      <span className="page-subtitle">
        <Skeleton style={{ marginBlockStart: ".5em" }} width={"20%"} />
      </span>
      <div>
        <Skeleton count={3} />
      </div>
      <h3 className="mt-4 mb-2">
        <Skeleton width={"20%"} />
      </h3>
      <div className="card-stack">
        {Array(4)
          .fill(1)
          .map((_, index) => (
            <Card key={index} />
          ))}
      </div>
    </main>
  );
}

function Card(): ReactElement {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="text-sm mb-1">
            <Skeleton width={"20%"} />
          </div>
          <Skeleton count={3} />
        </div>
      </div>
    </>
  );
}

import { type ReactElement } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CardSkeletonProps = {
  shoudCardBeSmaller: boolean;
};

export function CardSkeleton({
  shoudCardBeSmaller,
}: CardSkeletonProps): ReactElement {
  return (
    <div
      style={
        shoudCardBeSmaller
          ? { maxWidth: "50em", marginInline: "auto" }
          : undefined
      }
      className="card">
      <div className="card-header">
        <Skeleton />
      </div>
      <div className="card-body">
        <div className="card-preview-text">
          <Skeleton count={10} />
        </div>
      </div>
      <div className="card-footer">
        <Skeleton />
      </div>
    </div>
  );
}

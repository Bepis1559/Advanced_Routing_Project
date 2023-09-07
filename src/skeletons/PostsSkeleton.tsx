import { type ReactElement } from "react";
import { CardSkeleton } from "./CardSkeleton";

type CardSkeletonProps = {
  shoudCardBeSmaller: boolean;
};

export function PostsSkeleton({
  shoudCardBeSmaller,
}: CardSkeletonProps): ReactElement {
  return (
    <>
      {Array(4)
        .fill(1)
        .map((_, index) => (
          <CardSkeleton shoudCardBeSmaller={shoudCardBeSmaller} key={index} />
        ))}
    </>
  );
}

import { type ReactElement } from "react";
import { CardSkeleton } from "./CardSkeleton";

export function PostsSkeleton(): ReactElement {
  return (
    <>
      {Array(4)
        .fill(1)
        .map((_, index) => (
          <CardSkeleton key={index} />
        ))}
    </>
  );
}

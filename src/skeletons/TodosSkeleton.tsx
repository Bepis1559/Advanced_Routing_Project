import { type ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

export function TodosSkeleton(): ReactElement {
  return (
    <ul>
      <Skeleton borderRadius={".2em"} width={"35%"} count={40} />
    </ul>
  );
}

import { ReactElement } from "react";

export function createRouterObject(
  path: string,
  element: ReactElement,
  loader?: loader,
  errorElement?: ReactElement,
) {
  return {
    path: path,
    loader: loader,
    element: element,
    errorElement: errorElement,
  };
}

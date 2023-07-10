type loader = ({
  request,
}: LoaderFunctionArgs) =>
  | Promise<any>
  | (({
      request,
      params,
    }: LoaderFunctionArgs) => Promise<(user | post[] | todo[])[]>)
  | (({
      request,
      params,
    }: LoaderFunctionArgs) => Promise<(user | post[] | todo[])[]>)
  | (({ request }: LoaderFunctionArgs) => Promise<todo[]>)
  | (({ request }: LoaderFunctionArgs) => Promise<post[]>);

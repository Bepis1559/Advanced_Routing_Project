import { useQuery } from "@tanstack/react-query";
import { type ReactElement, useState } from "react";
import { fetchUsers } from "../helpers/fetchUsers";
import Skeleton from "react-loading-skeleton";
import { CardSkeleton } from "../skeletons/CardSkeleton";

type props = {
  isAllOptionNeeded: boolean;
  selectDefaultValue: string;
};

export function FormGroup({
  selectDefaultValue,
  isAllOptionNeeded,
}: props): ReactElement {
  const [value, setValue] = useState(selectDefaultValue);
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const users = usersQuery.data as unknown as user[];
  const { isLoading } = usersQuery;
  console.log(isLoading);

  return (
    <div className="form-group">
      <label htmlFor="userId">Author</label>
      {isLoading ? (
        <Skeleton count={2} />
      ) : (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          typeof="search"
          name="userId"
          id="userId">
          {isAllOptionNeeded ? <option value="0">All</option> : null}
          {users?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

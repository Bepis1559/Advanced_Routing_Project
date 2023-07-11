import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { fetchUsers } from "../helpers/fetchUsers";

type props = {
  isAnyOptionNeeded: boolean;
  selectDefaultValue: string;
};

export function FormGroup({
  selectDefaultValue,
  isAnyOptionNeeded,
}: props): ReactElement {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  const users = usersQuery.data as unknown as user[];

  return (
    <div className="form-group">
      <label htmlFor="userId">Author</label>
      <select
        defaultValue={selectDefaultValue}
        typeof="search"
        name="userId"
        id="userId">
        {isAnyOptionNeeded ? <option value="">Any</option> : null}

        {users?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { fetchUsers } from "../helpers/fetchUsers";

type props = {
  selectDefaultValue: string;
};

export function FormGroup({ selectDefaultValue }: props): ReactElement {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  const users = usersQuery.data as unknown as user[];
  return (
    <div className="form-group">
      <label htmlFor="userId">Author</label>
      <select
        defaultValue={selectDefaultValue ?? ""}
        typeof="search"
        name="userId"
        id="userId">
        <option value="">Any</option>
        {users?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

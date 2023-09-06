import { useQuery } from "@tanstack/react-query";
import { type ReactElement, useEffect } from "react";
import { fetchUsers } from "../helpers/fetchUsers";
import { useAtom } from "jotai";
import { userIdAtom } from "../contexts/postsFilter";

type props = {
  isAllOptionNeeded: boolean;
  userId: string;
};

export function FormGroup({ userId, isAllOptionNeeded }: props): ReactElement {
  const [selectValue, setSelectValue] = useAtom(userIdAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSelectValue(userId), []);
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  const users = usersQuery.data as unknown as user[];
  const { isLoading } = usersQuery;

  return (
    <div className="form-group">
      <label htmlFor="userId">Author</label>

      <select
        disabled={isLoading}
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
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
    </div>
  );
}

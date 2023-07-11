import { ReactElement } from "react";
type props = {
  selectDefaultValue: string;
  users: user[];
};
export function FormGroup({ selectDefaultValue, users }: props): ReactElement {
  return (
    <div className="form-group">
      <label htmlFor="userId">Author</label>
      <select
        defaultValue={selectDefaultValue ?? ""}
        typeof="search"
        name="userId"
        id="userId">
        <option value="">Any</option>
        {users.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

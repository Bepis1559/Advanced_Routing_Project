import { ReactElement } from "react";
import { Form } from "react-router-dom";

export function Filter(): ReactElement {
  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select typeof="search" name="userId" id="userId">
            <option value="">Any</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Clementina DuBuque</option>
          </select>
        </div>
        <button type="button" className="btn">
          Filter
        </button>
      </div>
    </Form>
  );
}

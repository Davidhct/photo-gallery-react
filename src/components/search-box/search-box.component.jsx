import React from "react";

import "./search-box.styles.css";

export const SearchBox = (props) => (
  <div>
    <input
      type="search"
      className="search"
      placeholder="Search images"
      onChange={props.handleChange}
    />
  </div>
);

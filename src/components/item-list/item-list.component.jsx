import React from "react";

import "./item-list.styles.css";

export const ItemList = (props) => (
  <div className={`item-list ${props.className}`}>{props.photos}</div>
);

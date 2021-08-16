import React from "react";
import "./loader.styles.css";

export const Loader = () => (
  <div className="wrapper-loader">
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

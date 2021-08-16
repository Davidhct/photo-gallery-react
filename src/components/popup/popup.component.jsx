import React from "react";

import "./popup.styles.css";

export const Popup = (props) => (
  <div className="wrapper" onClick={props.handleExpandClick}>
    <img
      id={props.id}
      src={`${props.photo.largeImageURL}`}
      alt="img"
      className="modal"
      style={props.rotateStyle}
    />
    <div className="footer">
      <button
        type="button"
        className="close-btn"
        onClick={props.handleExpandClick}
      >
        Close
      </button>
    </div>
  </div>
);

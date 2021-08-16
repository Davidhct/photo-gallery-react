import React from "react";
import rotateBtn from "./icons/rotate_icon.png";
import deleteBtn from "./icons/delete_icon.png";
import expandBtn from "./icons/expand_icon.png";
import draggableBtn from "./icons/drag_icon.png";

import "./item.styles.css";

export const Item = (props) => (
  <div className="item">
    <img
      id={props.id}
      index={props.index}
      src={`${props.photo.largeImageURL}`}
      alt="img"
      className="image"
      style={props.rotateStyle}
    />
    <div className="image-footer">
      <img
        id={props.id}
        src={deleteBtn}
        alt="delete icon"
        className="delete-icon"
        onClick={props.handleDeleteClick}
      />
      <img
        id={props.id}
        src={expandBtn}
        alt="expand icon"
        className="expand-icon"
        onClick={props.handleExpandClick}
      />

      <img
        id={props.id}
        src={rotateBtn}
        alt="rotate icon"
        className="rotate-icon"
        onClick={props.handleRotateClick}
      />
      <img
        id={props.id}
        src={draggableBtn}
        alt="draggable icon"
        className="drag-icon"
        onClick={props.handleDraggableClick}
      />
    </div>
  </div>
);

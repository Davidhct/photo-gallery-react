import React, { Component } from "react";
import rotateBtn from "../item/icons/rotate_icon.png";
import deleteBtn from "../item/icons/delete_icon.png";
import expandBtn from "../item/icons/expand_icon.png";
import draggableBtn from "../item/icons/drag_icon.png";

import "../item/item.styles.css";
import "./dnd.styles.css";

export class Dnd extends Component {
  constructor() {
    super();

    this.state = {
      draggedImg: undefined,
      dragIndex: undefined,
      dragPos: {
        x: [0, 0],
        y: [0, 0],
      },

      imgWidth: 0,
      imgHeight: 0,
      itemsBorder: [0, 0],
    };
  }

  handleOnDrag = (photo, index) => {
    this.setState({ draggedImg: photo, dragIndex: index });
    const arr = this.props.photos;
    this.props.updateStartPhoto(photo);
    arr.splice(index, 1);
  };

  handleOnDrop = (index) => {
    const arr = this.props.photos;

    const img = this.props.startPhoto;

    arr.splice(index, 0, img);

    let tmp = !this.props.draggable;
    this.props.updateChanges(arr, tmp);
  };

  handleOnDragOver = (e) => {
    e.preventDefault();
  };
  ///////////////////////////////////////////
  onTouchStart = (e, index) => {
    if (e.cancelable) e.preventDefault();

    let imgWidth = e.target.offsetParent.getBoundingClientRect().width;
    let imgHeight = e.target.offsetParent.getBoundingClientRect().height;
    let left = e.target.offsetParent.getBoundingClientRect().x + imgWidth;
    let up = e.target.offsetParent.getBoundingClientRect().y + imgHeight;
    let right = e.target.offsetParent.getBoundingClientRect().x - imgWidth;
    let down = e.target.offsetParent.getBoundingClientRect().y - imgHeight;

    this.setState(() => {
      return {
        dragIndex: index,
        dragPos: {
          x: [left, right],
          y: [up, down],
        },
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        itemsBorder: window.innerWidth,
      };
    });
  };
  //this.state.itemsBorder[1] <= e.changedTouches[0].clientY &&
  onTouchMove = (e) => {
    if (e.cancelable) e.preventDefault();

    const imgWidth = this.state.imgWidth;
    const imgHeight = this.state.imgHeight;
    const imgWidthCenter = imgWidth / 2;
    const imgHeightCenter = imgHeight / 2;
    let img = e.target.offsetParent;
    let condition;

    e.target.offsetParent.style.position = "fixed";
    condition =
      this.state.itemsBorder - imgWidthCenter / 2 >=
        e.changedTouches[0].clientX &&
      e.changedTouches[0].clientX - imgWidthCenter >= -10;

    if (condition) {
      let posX = e.changedTouches[0].clientX - imgWidthCenter;
      let posY = e.changedTouches[0].clientY - imgHeightCenter;

      this.setState((prevState) => {
        let left = prevState.dragPos.x[0];
        let up = prevState.dragPos.y[0];
        let right = prevState.dragPos.x[1];
        let down = prevState.dragPos.y[1];

        let draggedIndex = prevState.dragIndex;

        let pageWidth = Math.floor(window.innerWidth / imgWidth);

        if (posX >= left) {
          draggedIndex += 1;

          right = posX - imgWidthCenter;
          left += imgWidth;
        }
        if (posY >= up) {
          draggedIndex = draggedIndex + pageWidth;

          down = posY - imgHeightCenter;
          up += imgHeight;
        }
        if (posX <= right && draggedIndex >= 0) {
          draggedIndex -= 1;

          right -= imgWidth;
        }
        if (posY <= down && draggedIndex >= 0) {
          draggedIndex = draggedIndex - pageWidth;

          down -= imgHeight;
        }

        return {
          dragIndex: draggedIndex,
          dragPos: {
            x: [left, right],
            y: [up, down],
          },
        };
      });
      img.style.left = posX + "px";
      img.style.top = posY + "px";
      img.style.zIndex = 15;
    }
  };
  onTouchEnd = (e, photo, index) => {
    if (e.cancelable) e.preventDefault();

    let draggedIndex = this.state.dragIndex;
    const arr = this.props.photos;

    arr.splice(index, 1);
    arr.splice(draggedIndex, 0, photo);

    let tmp = !this.props.draggable;
    this.props.updateChanges(arr, tmp);
  };

  render() {
    return (
      <div className="item">
        <img
          id={this.props.id}
          src={`${this.props.photo.largeImageURL}`}
          alt="img"
          className="image"
          style={this.props.rotateStyle}
          onDrag={() => this.handleOnDrag(this.props.photo, this.props.index)}
          onDrop={() => this.handleOnDrop(this.props.index)}
          onDragOver={(e) => this.handleOnDragOver(e)}
          onTouchStart={(e) => this.onTouchStart(e, this.props.index)}
          onTouchEnd={(e) =>
            this.onTouchEnd(e, this.props.photo, this.props.index)
          }
          onTouchMove={(e) => this.onTouchMove(e)}
        />
        <div className="image-footer">
          <img
            id={this.props.id}
            src={deleteBtn}
            alt="delete icon"
            className="delete-icon"
            onClick={this.props.handleDeleteClick}
          />
          <img
            id={this.props.id}
            src={expandBtn}
            alt="expand icon"
            className="expand-icon"
            onClick={this.props.handleExpandClick}
          />

          <img
            id={this.props.id}
            src={rotateBtn}
            alt="rotate icon"
            className="rotate-icon"
            onClick={this.props.handleRotateClick}
          />
          <img
            id={this.props.id}
            src={draggableBtn}
            alt="draggable icon"
            className="drag-icon"
            onClick={this.props.handleDraggableClick}
          />
        </div>
      </div>
    );
  }
}

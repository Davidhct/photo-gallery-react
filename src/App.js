import React, { Component } from "react";
import { debounce } from "lodash";
import { SearchBox } from "./components/search-box/search-box.component";
import { ItemList } from "./components/item-list/item-list.component";
import { Item } from "./components/item/item.component";
import { Popup } from "./components/popup/popup.component";
import { Dnd } from "./components/dnd/dnd.component";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./components/loader/loader.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      page: 0,
      more: false,
      searchField: "",
      searchValue: "",
      apiUrl: "https://pixabay.com/api",
      accessKey: process.env.REACT_APP_ACCESSKEY,
      rotation: 0,
      showModal: false,
      rotId: 0,
      modalId: 0,
      draggable: false,
      startPhoto: undefined,
    };
  }
  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  componentWillUmaount() {
    this.debouncedEvent.cancle();
  }

  handleChange = (event) => {
    let val = event.target.value.trim();
    this.setState({ searchField: val });
    if (val === "") {
      this.setState({ photos: [], page: 0, more: false });
    } else {
      this.setState({ searchValue: val, page: 1 });

      fetch(
        `${this.state.apiUrl}/?key=${this.state.accessKey}&q=${this.state.searchValue}&image_type=photo&page=${this.state.page}&per_page=30`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.hits.length === 0 || data.hits.length < 20) {
            return this.setState({ photos: data.hits, more: false });
          }
          return this.setState({
            photos: data.hits,
            more: true,
            page: this.state.page + 1,
          });
        })
        .catch((err) => console.error(err));
    }
  };
  removeDuplicate = (arrObj) => {
    const map = new Map();
    const rmIndex = [];
    arrObj.forEach((element, i) => {
      if (map.get(element.id) === true) {
        rmIndex.push(i);
      } else {
        map.set(element.id, true);
      }
    });

    for (let i = 0; i < rmIndex.length; i++) {
      arrObj.splice(rmIndex[i], 1);
    }

    return arrObj;
  };

  fetchImages = () => {
    let arr = this.state.photos;
    let moreData = arr;
    fetch(
      `${this.state.apiUrl}/?key=${this.state.accessKey}&q=${this.state.searchValue}&image_type=photo&page=${this.state.page}&per_page=30`
    )
      .then((res) => {
        if (!res.ok)
          return this.setState({
            more: false,
          });
        return res.json();
      })
      .then((data) => {
        if (data !== undefined) {
          moreData.push(...data.hits);
          moreData = this.removeDuplicate(moreData);
          this.setState({ photos: moreData, page: this.state.page + 1 });
        }
      })
      .catch((err) => console.error(err));
  };

  handleRotateClick = (photo) => {
    let newRotation = this.state.rotation - 90;
    if (newRotation === -360) newRotation = 0;

    let updateRotId = photo.id;
    this.setState({
      rotation: newRotation,
      rotId: updateRotId,
    });
  };

  handleExpandClick = (photo) => {
    let updateModel = !this.state.showModal;
    let updateId = photo.id;
    this.setState({ showModal: updateModel, modalId: updateId });
  };

  handleDeleteClick = (index) => {
    let arr = this.state.photos;
    arr.splice(index, 1);
    this.setState({ photos: arr });
  };

  toggleDraggable = () => {
    let updateDrag = !this.state.draggable;
    this.setState({
      draggable: updateDrag,
    });
  };
  dndUpdateChanges = (images, flag) =>
    this.setState({ photos: images, draggable: flag });

  dndUpdateStartPhoto = (photo) => this.setState({ startPhoto: photo });

  render() {
    const images = this.state.photos.map((photo, index) => {
      let newStyle;

      if (photo.id === this.state.rotId) {
        newStyle = { transform: `rotate(${this.state.rotation}deg)` };
      }
      if (this.state.draggable) {
        return (
          <Dnd
            key={photo.id}
            photos={this.state.photos}
            id={photo.id}
            index={index}
            photo={photo}
            draggable={this.state.draggable}
            rotateStyle={newStyle}
            updateChanges={this.dndUpdateChanges}
            startPhoto={this.state.startPhoto}
            updateStartPhoto={this.dndUpdateStartPhoto}
            handleExpandClick={() => this.handleExpandClick(photo)}
            handleRotateClick={() => this.handleRotateClick(photo)}
            handleDeleteClick={() => this.handleDeleteClick(index)}
            handleDraggableClick={() => this.toggleDraggable(photo)}
            onDrag={this.handleOnDrag}
            onDrop={this.handleOnDrop}
            onDragOver={this.handleOnDragOver}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchMove={this.onTouchMove}
          />
        );
      }

      if (photo.id === this.state.modalId && this.state.showModal)
        return (
          <Popup
            id={photo.id}
            index={index}
            key={photo.id}
            photo={photo}
            rotateStyle={newStyle}
            handleExpandClick={() => this.handleExpandClick(photo)}
          />
        );

      return (
        <Item
          key={photo.id}
          id={photo.id}
          index={index}
          photo={photo}
          rotateStyle={newStyle}
          handleExpandClick={() => this.handleExpandClick(photo)}
          handleRotateClick={() => this.handleRotateClick(photo)}
          handleDeleteClick={() => this.handleDeleteClick(index)}
          handleDraggableClick={() => this.toggleDraggable(photo)}
        />
      );
    });

    return (
      <div className="App">
        <div className="header">
          <h1>Photo Gallery</h1>
          <section className="head-section">
            <SearchBox
              handleChange={this.debounceEvent(this.handleChange, 1000)}
            />
          </section>
        </div>
        <InfiniteScroll
          dataLength={images.length} //This is important field to render the next data
          next={this.fetchImages}
          hasMore={this.state.more}
          loader={<Loader />}
        >
          {this.state.searchField.length > 0 ? (
            <ItemList photos={images} />
          ) : null}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";

const FullscreenImagesModal = ({ visible, onHide, images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const itemTemplate = (item) => {
      return (
        <img
          src={item}
          alt="Fullscreen Image"
          style={{ width: "100%", height: "auto" }}
        />
      );
    };
  
    const thumbnailTemplate = (item, index) => {
      return (
        <img
          src={item}
          alt={`Thumbnail ${index + 1}`}
          style={{ width: "64px", height: "64px", cursor: "pointer" }}
          onClick={() => setActiveIndex(index)}
        />
      );
    };
  
    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        style={{ width: "80vw", maxWidth: "1200px" }}
        modal
        className="p-fluid"
      >
        <Galleria
          value={images}
          activeIndex={activeIndex}
          onItemChange={(e) => setActiveIndex(e.index)}
          showThumbnails
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      </Dialog>
    );
  };

export default FullscreenImagesModal

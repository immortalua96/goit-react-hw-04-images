import React from 'react';


function ImageGalleryItem({ onOpenModal, ...otherProps }) {
  const { webformatURL, largeImageURL, tags } = otherProps;
  return (
    <img
      className="gallery__image"
      src={webformatURL}
      alt={tags}
      onClick={() => onOpenModal(largeImageURL, tags)}
    />
  );
}


export default ImageGalleryItem;
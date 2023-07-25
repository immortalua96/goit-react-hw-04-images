import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';


function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className="gallery">
      {images.map(({ id, ...otherProps }) => {
        return (
          <li key={id} className="gallery__item">
            <ImageGalleryItem onOpenModal={onOpenModal} {...otherProps} />
          </li>
        );
      })}
    </ul>
  );
}



export default ImageGallery;

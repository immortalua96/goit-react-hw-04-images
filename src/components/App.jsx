import React, { useState, useEffect } from 'react';
import * as ImageService  from "../servise/Api";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Notify, Loading } from 'notiflix';
import { Wrapper, ErrorText } from './App.styled';
import Modal from './Modal/Modal';


export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async (query, page) => {
      try {
        setIsLoading(true);
        const data = await ImageService.getImages(query, page);
        if (data.hits.length === 0) {
          Notify.failure('We did not find anything for your request');
          return;
        }
        setImages(state => [...state, ...data.hits]);
        setTotal(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(query, page);
  }, [page, query]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => setPage(state => state + 1);

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const countTotalPage = total / images.length;

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />

      {isLoading ? Loading.pulse({ svgSize: '240px' }) : Loading.remove()}

      {images.length !== 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {countTotalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}

      {error && (
        <ErrorText>
          An unexpected error has occurred. Try to come back later.
        </ErrorText>
      )}
    </Wrapper>
  );
}
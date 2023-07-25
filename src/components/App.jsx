import React, { Component } from 'react'
import * as ImageService  from "../servise/Api";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';


export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: false,
    isLoading: false ,
    showBtn:false,
    isError:'',
    largeImage: '',
    tags: '',
    showModal:false,
  }
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true })
      ImageService.getImages(query,page).then(({total,hits}) => {
        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showBtn: page < Math.ceil(total / 12),
        }));
      }).catch((error) => { this.setState({ isError: error.message }) }).finally(() => {
        this.setState({ isLoading: false })
      });
    }
  }
  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };
  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  onOpenModal = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };
  render() {
    const { images,showBtn,isLoading ,  largeImage,
    tags} =
      this.state;
    return (
      <div>
       <Searchbar onSubmit={this.handleSubmit} />
       {images.length !== 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
         {showBtn && <Button onClick={this.onLoadMore} />}
         {isLoading && <Loader onClick={this.onLoadMore} />}
        
         <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        
      </div>
      
    )
  }
}

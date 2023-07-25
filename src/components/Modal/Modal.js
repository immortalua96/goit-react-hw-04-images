import React, { Component } from 'react';
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
 

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImage, tags } = this.props;

    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={largeImage} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseEsc);
  }
  handleCloseEsc = e => {
    if (e.code === 'Escape') {
      // console.log('close modal window');
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={this.props.imgUrl} alt="large works" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;

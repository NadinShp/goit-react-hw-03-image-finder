import styles from './ImageItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, user, onChooseImg }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={`works of ${user}`}
      className={styles.ImageGalleryItem__image}
      onClick={onChooseImg}
    />
  </li>
);
ImageGalleryItem.defaultProps = {
  user: 'user',
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  user: PropTypes.string,
  onChooseImg: PropTypes.func.isRequired,
};
export default ImageGalleryItem;

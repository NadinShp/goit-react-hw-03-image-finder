import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ data, onChooseImg }) => (
  <ul className={styles.ImageGallery}>
    {data.map(({ id, webformatURL, user }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        user={user}
        onChooseImg={() => onChooseImg(id)}
      />
    ))}
  </ul>
);
ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      user: PropTypes.string,
    }),
  ).isRequired,
  onChooseImg: PropTypes.func.isRequired,
};
export default ImageGallery;

import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '20667858-5f0c6641398370706bf4f66c3';

const fetchImages = (query = '', page = 1) => {
  const path = `${BASE_URL}/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(path).then(response => response.data.hits);
};
fetchImages.defaultProps = {
  query: '',
  page: 1,
};
fetchImages.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};

export default fetchImages;

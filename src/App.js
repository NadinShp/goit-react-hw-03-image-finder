import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import styles from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchImages from './servises/pixabayApi';
import Button from './components/Button/Button';
import Loaders from './components/Loader/Loaders';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    selectedImg: '',
    images: [],
    showModal: false,
    query: '',
    page: 1,
    isLoading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.handleRequest();
    }
  }
  onChangeQuery = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
    });
  };
  handleRequest = async () => {
    const { query } = this.state;
    this.setState({ isLoading: true });
    try {
      const hits = await fetchImages(query);
      this.setState({ images: hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleLoadMore = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const hits = await fetchImages(query, page + 1);
      this.setState(prevState => ({
        page: prevState.page + 1,
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleChooseImg = pictureId => {
    const { images } = this.state;
    const findImg = images.find(image => image.id === pictureId);
    this.setState({ selectedImg: findImg.largeImageURL });
    this.toggleModal();
  };
  render() {
    const { showModal, images, isLoading, error, selectedImg } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h1>Ssory something is wrong. Try again, please</h1>}
        {images.length > 0 && (
          <ImageGallery data={images} onChooseImg={this.handleChooseImg} />
        )}
        {isLoading && <Loaders onClose={this.toggleModal} />}
        {shouldRenderLoadMoreBtn && <Button onRequest={this.handleLoadMore} />}
        {showModal && <Modal onClose={this.toggleModal} imgUrl={selectedImg} />}
      </div>
    );
  }
}
App.defaultProps = {
  selectedImg: '',
  images: [],
  showModal: false,
  query: '',
  page: 1,
  isLoading: false,
  error: null,
};
App.propTypes = {
  selectedImg: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      user: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  showModal: PropTypes.bool,
  query: PropTypes.string,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};
export default App;

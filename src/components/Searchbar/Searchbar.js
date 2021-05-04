import styles from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchWord: '',
  };
  handleInputValue = e => {
    const { value } = e.currentTarget;
    this.setState({
      searchWord: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchWord);
  };
  render() {
    const { searchWord } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__buttonLabel}>Search</span>
          </button>
          <input
            className={styles.SearchForm__input}
            type="text"
            value={searchWord}
            onChange={this.handleInputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
SearchBar.defaultProps = {
  searchWord: '',
};
SearchBar.propTypes = {
  searchWord: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;

import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onRequest }) => (
  <button type="button" className={styles.Button} onClick={onRequest}>
    Load more
  </button>
);
Button.propTypes = {
  onRequest: PropTypes.func.isRequired,
};
export default Button;

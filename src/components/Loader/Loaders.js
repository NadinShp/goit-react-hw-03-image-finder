import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styles from './Loaders.module.css';

const Loaders = () => (
  <div className={styles.wrapper}>
    <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
  </div>
);
export default Loaders;

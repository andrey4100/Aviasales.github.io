import React from 'react';
import styles from './Spinner.module.scss'; // Создайте файл Spinner.module.scss для стилей

function Spinner() {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.spinner}>
      </div>
      <div className={styles.spinner__text}>Loading...</div>
    </div>
  );
}

export default Spinner;
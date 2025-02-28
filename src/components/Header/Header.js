import React from 'react';

import styles from './Header.module.scss';
import Logo from "../../resourses/img/Logo.svg"

function Header() {

  return (
      <div className={styles.header}>
        <img className={styles.img} alt='Logo' src={Logo}/>
      </div>
  );
}

export default Header;
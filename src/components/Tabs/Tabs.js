/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import  { useDispatch, useSelector } from 'react-redux';

import styles from './Tabs.module.scss';

import { sortByPrice, sortByDuration, sortByOptimal, setTab } from '../../store/ticketsSlice';

function Tabs() {

  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.tickets.selectedTab);


  const handleTabClick = (tab) => {
    dispatch(setTab(tab));

    switch (tab) {
      case 'cheap':
        dispatch(sortByPrice());
        break;
      case 'fast':
        dispatch(sortByDuration());
        break;
      case 'optimal':
        dispatch(sortByOptimal());
        break;
      default:
        break;
    }
  };


  return (
    <div className={styles.tabs}>
      <div
        className={`${styles.tabs__item} ${selectedTab === 'cheap' ? styles.select : ''}`}
        onClick={() => handleTabClick('cheap')}
      >
        <div className={styles.tabs__text}>САМЫЙ ДЕШЕВЫЙ</div>
      </div>
      <div
        className={`${styles.tabs__item} ${selectedTab === 'fast' ? styles.select : ''}`}
        onClick={() => handleTabClick('fast')}
      >
        <div className={styles.tabs__text}>САМЫЙ БЫСТРЫЙ</div>
      </div>
      <div
        className={`${styles.tabs__item} ${selectedTab === 'optimal' ? styles.select : ''}`}
        onClick={() => handleTabClick('optimal')}
      >
        <div className={styles.tabs__text}>ОПТИМАЛЬНЫЙ</div>
      </div>
    </div>
  );
}

export default Tabs;
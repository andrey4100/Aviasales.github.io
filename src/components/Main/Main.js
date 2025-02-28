import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Main.module.scss';

import Tabs from '../Tabs';
import TicketList from '../TicketList';
import Spinner from '../Spinner'; 
import Error from '../Error';

function Main() {
  const isLoading = useSelector((state) => state.tickets.isLoading);
  const error = useSelector((state) => state.tickets.error);

  return (
      <div className={styles.main}>
        <Tabs />
        {isLoading && <Spinner />}
        {error && <Error message={error} />}
        {!error && <TicketList />}
    </div>
  );
}


export default Main;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.scss';

import Header from '../Header';
import Filter from '../Filter';
import Main from '../Main';

import { fetchSearchId, fetchTickets } from '../../store/ticketsSlice';

function App() {
  const tickets = useSelector((state) => state.tickets.tickets);
  const fetchStatus500 = useSelector((state) => state.tickets.fetchStatus500);
  const stopFetch = useSelector((state) => state.tickets.stopFetch);
  const searchId = useSelector((state) => state.tickets.searchId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (!stopFetch && searchId) dispatch(fetchTickets());
  }, [dispatch, tickets, fetchStatus500, stopFetch, searchId]);

  return (
    <div className={styles.app}>
      <Header />
      <Filter />
      <Main />  
    </div>
  );
}

export default App;

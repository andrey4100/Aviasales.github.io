import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMoreTicket } from '../../store/ticketsSlice';

import styles from './TicketList.module.scss';

import { generateKey,  isVisibleByFilters } from '../../utils/ticketListUtils';

import Ticket from '../Ticket';
import Warning from '../Warning';

function TicketList () {
    const { tickets, numShowTicket, showAllTickets, valueFilterTransfer, error, isLoading } = useSelector(
        (state) => state.tickets
    );

  const dispatch = useDispatch();

  
const visibleTickets = tickets.filter((item) =>  isVisibleByFilters(item, showAllTickets, valueFilterTransfer));

return (
  <div className={styles.ticketList}>
    {visibleTickets.slice(0, numShowTicket).map((ticket) => (
      <Ticket key={generateKey()} {...ticket} />
    ))}

    {visibleTickets.length === 0 && !error && !isLoading
      ? <Warning />
      : visibleTickets.length > numShowTicket && (
          <button
            type="button"
            className={styles.ticketList__button}
            onClick={() => dispatch(showMoreTicket())}
          >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        )
    }
  </div>
);
};

export default TicketList;
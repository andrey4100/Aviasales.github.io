import React from 'react';

import styles from './Ticket.module.scss';

import { formatPrice, getCarrierLogoUrl, formatDepartureTime, 
        formatArrivalTime,  formatTravelDuration, getTransfersWordForm } from '../../utils/ticketUtils';


function Ticket({ price, carrier, segments }) {
  const formattedPrice = formatPrice(price);
  const carrierLogoUrl = getCarrierLogoUrl(carrier);

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__wrapper}>
        <div className={styles.ticket__price}> {`${formattedPrice} \u20bd`} </div>
        <img className={styles.ticket__logo} alt="logo" src={carrierLogoUrl} />
      </div>
      {segments.map((item, index) => (
        <div className={styles.ticket__information} key={`${item.date}-${index}`}>
          <div className={`${styles.ticket__text} ${styles.ticket__textGrey}`}>
            {item.origin}-{item.destination}
          </div>
          <div className={`${styles.ticket__text} ${styles.ticket__textGrey}`}>В ПУТИ</div>
          <div className={`${styles.ticket__text} ${styles.ticket__textGrey}`}>
            {item.stops.length} {getTransfersWordForm(item.stops.length)}
          </div>
          <div className={styles.ticket__text}>
            {formatDepartureTime(item.date)} - {formatArrivalTime(item.date, item.duration)}
          </div>
          <div className={styles.ticket__text}> {formatTravelDuration(item.duration)}</div>
          <div className={styles.ticket__text}> {item.stops.join(', ')}</div>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
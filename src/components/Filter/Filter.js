import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.scss';
import { setFilterValue, toggleAllFilters } from '../../store/ticketsSlice';

function Filter() {
  const dispatch = useDispatch();

  const valueFilterTransfer = useSelector((state) => state.tickets.valueFilterTransfer);
  const showAllTickets = useSelector((state) => state.tickets.showAllTickets);

  const filterState = useMemo(
    () => ({
      valueFilterTransfer,
      showAllTickets,
    }),
    [valueFilterTransfer, showAllTickets]
  );

    const handleCheckboxChange = useCallback((event) => {
        const { name, checked } = event.target;
        let filterValue = null;

        switch (name) {
            case 'all':
                dispatch(toggleAllFilters(checked));
                break;
            case '0_transfer':
                filterValue = 0;
                break;
            case '1_transfer':
                filterValue = 1;
                break;
            case '2_transfer':
                filterValue = 2;
                break;
            case '3_transfer':
                filterValue = 3;
                break;
            default:
                return;
        }

        if (filterValue !== null) {
            dispatch(setFilterValue({ filterValue, isChecked: checked }));
        }
    }, [dispatch]);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__container}>
        <div className={styles.filter__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        <div className={styles.filter__wrapper}>
          <label className={styles.filter__label}>
            <input
              className={styles.realCheckbox}
              type="checkbox"
              name="all"
              checked={filterState.showAllTickets}
              onChange={handleCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.filter__text}>Все</span>
          </label>
          <label className={styles.filter__label}>
            <input
              className={styles.realCheckbox}
              type="checkbox"
              name="0_transfer"
              checked={filterState.valueFilterTransfer.includes(0)}
              onChange={handleCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.filter__text}>Без пересадок</span>
          </label>
          <label className={styles.filter__label}>
            <input
              className={styles.realCheckbox}
              type="checkbox"
              name="1_transfer"
              checked={filterState.valueFilterTransfer.includes(1)}
              onChange={handleCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.filter__text}>1 пересадка</span>
          </label>
          <label className={styles.filter__label}>
            <input
              className={styles.realCheckbox}
              type="checkbox"
              name="2_transfer"
              checked={filterState.valueFilterTransfer.includes(2)}
              onChange={handleCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.filter__text}>2 пересадки</span>
          </label>
          <label className={styles.filter__label}>
            <input
              className={styles.realCheckbox}
              type="checkbox"
              name="3_transfer"
              checked={filterState.valueFilterTransfer.includes(3)}
              onChange={handleCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.filter__text}>3 пересадки</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
import React from 'react';

import styles from './Warning.module.scss';

function Warning () {

    return (
      <div className={styles.n__warning}>
        <p>По вашему запросу не удалось найти ни одного подходящего рейса.</p>
      </div>
    )
};

export default Warning;
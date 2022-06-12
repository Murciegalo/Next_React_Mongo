import { useState } from 'react';
import styles from '../styles/OrderDetailM.module.css';

const OrderDetailsM = () => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Due payment of 12$ upon delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Fullname</label>
          <input
            placeholder='Jhon Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsM;

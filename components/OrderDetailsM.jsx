import { useState } from 'react';
import styles from '../styles/OrderDetailM.module.css';

const OrderDetailsM = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Due payment of 12$ upon delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Your fullname</label>
          <input
            placeholder='Jhon Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            placeholder='+1 524 452 12'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder='Kilimanjaro, top 1degrees'
            type='text'
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};
export default OrderDetailsM;

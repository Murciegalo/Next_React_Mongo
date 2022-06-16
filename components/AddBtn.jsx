import React from 'react';
import styles from '../styles/AddBtn.module.css';

const AddBtn = ({ setClose }) => {
  return (
    <div className={styles.mainAddBtn} onClick={() => setClose(false)}>
      Add new pizza
    </div>
  );
};
export default AddBtn;

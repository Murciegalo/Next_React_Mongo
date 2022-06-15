import React from 'react';
import styles from '../styles/AddBtn.module.css';

const AddBtn = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.AddBtn}>
      Add new pizza
    </div>
  );
};
export default AddBtn;

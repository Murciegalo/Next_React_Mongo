import { useState } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dwblfypch/image/upload',
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        description,
        prices,
        extraOptions,
        img: url,
      };
      await axios.post('http://localhost:3000/api/products', newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Add a new pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            type='text'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <textarea
            rows={4}
            type='text'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='small'
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputMd}`}
              type='number'
              placeholder='medium'
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputLg}`}
              type='number'
              placeholder='large'
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extras</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='text'
              name='text'
              placeholder='Item'
              onChange={(e) => handleExtraInput(e)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              name='price'
              placeholder='Price'
              onChange={(e) => handleExtraInput(e)}
            />
            <button className={styles.extraBtn} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((el) => (
              <span key={el.text} className={styles.extraItem}>
                {el.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addBtn} onClick={handleCreate}>
          Add New Product
        </button>
      </div>
    </div>
  );
};
export default Add;

import Image from 'next/image';
import styles from '../styles/PizzaCard.module.css';

const PizzaCard = ({ pizza: { img, title, prices, desc } }) => {
  return (
    <div className={styles.container}>
      <Image src={img} alt='' width='500' height='500' />
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>{prices[0]}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default PizzaCard;

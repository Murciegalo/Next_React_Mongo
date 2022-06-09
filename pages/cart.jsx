import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.pizzas.map((el) => (
              <tr key={el._id} className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={el.img}
                      layout='fill'
                      objectFit='cover'
                      alt=''
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{el.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {el.extras.map((el) => (
                      <span key={el._id}>{el.text}</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${el.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{el.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${el.price * el.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

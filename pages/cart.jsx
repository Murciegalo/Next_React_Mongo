import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cart';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  // PAYPAL
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post('https://localhost:3000/api/orders', data);
      res.status === 201 && router.push(`/orders/${res.data._id}`);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

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
          {open ? (
            <div className={styles.paypal}>
              <button className={styles.cash}>Pay on cash</button>
              <PayPalScriptProvider
                options={{
                  'client-id': 'test',
                  components: 'buttons',
                  currency: 'USD',
                }}>
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(!open)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

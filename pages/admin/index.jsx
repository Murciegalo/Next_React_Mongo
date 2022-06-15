import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Admin.module.css';

const Index = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [ordersList, setOrdersList] = useState([]);
  const [status, setStatus] = useState([
    'preparing',
    'on delivery',
    'delivered',
  ]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      setPizzaList(pizzaList.filter((el) => el._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatus = async (id) => {
    const idStatus = ordersList.filter((el) => el._id === id)[0];
    const currentStatus = idStatus.status;
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrdersList([res.data, ...ordersList.filter((el) => el._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {pizzaList.map((el) => (
              <tr key={el._id} className={styles.trTitle}>
                <th>
                  <Image
                    width={50}
                    height={50}
                    objectFit='cover'
                    alt=''
                    src={el.img}
                  />
                </th>
                <th>{el._id.slice(0, 5)}...</th>
                <th>{el.title}</th>
                <th>{el.prices[0]}</th>
                <th>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(el._id)}>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {ordersList.map((el) => (
              <tr key={el._id} className={styles.trTitle}>
                <th>{el._id.slice(0, 6)}...</th>
                <th>{el.customer}</th>
                <th>{el.total}</th>
                <th>
                  {el.method === 0 ? <span>cash</span> : <span>paid</span>}
                </th>
                <th>{status[el.status]}</th>
                <th>
                  <button
                    onClick={() => handleStatus(el._id)}
                    className={styles.button}>
                    Next Stage
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const productsRes = await axios.get(`http://localhost:3000/api/products`);
  const ordersRes = await axios.get(`http://localhost:3000/api/orders`);
  return {
    props: {
      products: productsRes.data,
      orders: ordersRes.data,
    },
  };
};
export default Index;

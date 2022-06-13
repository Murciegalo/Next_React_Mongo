import axios from 'axios';
import Image from 'next/image';
import styles from '../../styles/Admin.module.css';

const index = ({ products, orders }) => {
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
            {products.map((el) => (
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
                  <button className={styles.button}>Delete</button>
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
            <tr className={styles.trTitle}>
              <th>{'45513268965135'.slice(0, 6)}...</th>
              <th>Jhon Doe</th>
              <th>$50</th>
              <th>Paid</th>
              <th>Preparing</th>
              <th>
                <button className={styles.button}>Next Stage</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export const getServerSideProps = async () => {
  const productsRes = await axios.get(`http://localhost:3000/api/products`);
  const ordersRes = await axios.get(`http://localhost:3000/api/orders`);
  return {
    props: {
      products: productsRes.data,
      orders: ordersRes.data,
    },
  };
};
export default index;

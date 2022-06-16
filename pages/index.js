import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Add from '../components/Add';
import AddBtn from '../components/AddBtn';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Stop</title>
        <meta name='description' content='Tasty Pizza' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddBtn setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookie || '';
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get(`http://localhost:3000/api/products`);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

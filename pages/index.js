import Head from 'next/head';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Stop</title>
        <meta name='description' content='Tasty Pizza' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}

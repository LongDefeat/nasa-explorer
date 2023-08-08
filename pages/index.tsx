import { NextPage } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import nasaConfig from '../config';
import styles from './Home.module.css';
import StarryBackground from '../components/StarryBackground';

const HomePage: NextPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: nasaConfig.apiKey
          }
        });
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <StarryBackground />
    <div className={styles.container}>
      <h1 className={styles.intro}>Welcome to the NASA Explorer</h1>
      {data && (
        <div>
          <h2 className={styles.title}>{data.title}</h2>
          <img src={data.url} alt={data.title} className={styles.photo}/>
          <p className={styles.explanation}>{data.explanation}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default HomePage;

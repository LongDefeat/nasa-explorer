// External Libraries and Type Imports
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Internal Component and Config Imports
import nasaConfig from '../config';
import StarryBackground from '../components/StarryBackground';

// Styles Import
import styles from './Home.module.css';

const HomePage: NextPage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Fetch NASA Photo of the Day on mount
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

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/SearchResults?query=${query}`);
  };

  return (
    <>
      <StarryBackground />
      <div className={styles.container}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input 
            type="text" 
            placeholder="Search NASA's photo library..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Explore</button>
        </form>
        <h1 className={styles.intro}>Welcome to the NASA Explorer</h1>
        {data && (
          <div>
            <h2 className={styles.title}>{data.title}</h2>
            <img src={data.url} alt={data.title} className={styles.photo} />
            <p className={styles.explanation}>{data.explanation}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;

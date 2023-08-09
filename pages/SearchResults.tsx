import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';  // Import the Link component
import axios from 'axios';
import { useEffect, useState } from 'react';
import nasaConfig from '../config';
import styles from './SearchResults.module.css';

const SearchResults: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { query } = router.query;

    if (!query) return;

    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`https://images-api.nasa.gov/search`, {
          params: {
            q: query,
            page: currentPage
          }
        });

        setData(res.data.collection.items.slice(0, 10)); 
      } catch (e) {
        console.error(e);
      }
    };

    fetchPhotos();
  }, [router.query, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeButtonContainer}>
        <Link href="/">  {/* Use Link to redirect to home */}
            <button className={styles.homeButton}>Home</button>
        </Link>
      </div>
        
        <div className={styles.container}>
          {data.map((photo, index) => (
            <div key={index} className={styles.resultCard}>
              <img src={photo.links[0].href} alt={photo.data[0].title} className={styles.photo} />
              <h2 className={styles.resultTitle}>{photo.data[0].title}</h2>
            </div>
          ))}
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)} className={styles.prevPage}>Previous</button>
            )}
              <button onClick={() => setCurrentPage(currentPage + 1)} className={styles.nextPage}>Next</button>
          </div>
        </div>
      </div>
  );
};

export default SearchResults;

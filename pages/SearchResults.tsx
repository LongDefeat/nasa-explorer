import { NextPage } from 'next';
import { useRouter } from 'next/router';
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
        
        // Navigate the response correctly to get the images
        setData(res.data.collection.items.slice(0, 10)); 

        console.log(res.data.collection.items); 
      } catch (e) {
        console.error(e);
      }
    };

    fetchPhotos();
  }, [router.query, currentPage]);
  useEffect(() => {
    // Scolls to top of page whenever data changes
    window.scrollTo(0, 0);
  }, [data]);

  return (
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
  );
};

export default SearchResults;

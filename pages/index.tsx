// External Libraries and Type Imports
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

// Internal Component and Config Imports
import nasaConfig from '../config';
import StarryBackground from '../components/StarryBackground';

// Styles Import
import styles from './Home.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage: NextPage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [roverImages, setRoverImages] = useState([])
  const router = useRouter();
  const fetchRoverImages = async () => {
    try {
      const res = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
        params: {
          sol: 1000, // get photos from 1000th Martian day since rover arrival
          api_key: nasaConfig.apiKey
        } 
      });
      setRoverImages(res.data.photos.slice(0, 10)); 
    } catch (err){
      console.error(err)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true
  };

  // Fetch NASA Photo of the Day on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: nasaConfig.apiKey
          }
        });
        console.log(res.data)
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRoverImages = async () => {
      try {
        const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`, {
          params: {
            sol: 1000,  // Example: get photos from the 1000th Martian day since landing
            api_key: nasaConfig.apiKey
          }
        });
        setRoverImages(res.data.photos.slice(0, 10)); // Taking only first 10 for display
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchRoverImages();
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
    <section className={styles.galleries}>
    <h2 className={styles.marsTitle}>What's Happening on Mars?</h2>
    <div className={styles.slideshowContainer}>
    <Slider {...settings}>
      {roverImages.map((photo) => (
        <div key={photo.id}>
          <img src={photo.img_src} alt={`Mars Rover - ${photo.id}`} className={styles.roverImage} />
        </div>
      ))}
    </Slider>
</div>

    </section>

    </>
  );
};

export default HomePage;

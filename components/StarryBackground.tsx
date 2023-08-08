import { useEffect, useRef } from 'react';
import styles from './StarryBackground.module.css';

const StarryBackground: React.FC = () => {
  const starRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    starRefs.current.forEach(star => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      star.style.transform = `translate(${x}px, ${y}px)`;
      star.style.width = `${0.5 + Math.random() * 2}px`; 
      star.style.height = star.style.width;
    });
  }, []);

  return (
    <div className={styles.starryBackground}>
      {[...Array(100)].map((_, i) => (
        <div key={i} className={styles.star} ref={el => starRefs.current[i] = el}></div>
      ))}
    </div>
  );
};

export default StarryBackground;

import React, { useState, useEffect } from 'react';
import './Blogevent.css';
import Blogmain from '../../images/Blogmain.png';
import image1 from '../../images/cat.jpeg';
import image2 from '../../images/taylor-swift-in-blue-wallpaper-1920x600_57.jpg';
import image3 from '../../images/Taylor.jpeg';

export function Blogevent() {
  const thumbnails: string[] = [image1, image2, image3, Blogmain, Blogmain, Blogmain];
  const [currentMainImage, setCurrentMainImage] = useState<string>(Blogmain);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % thumbnails.length;
        setCurrentMainImage(thumbnails[nextIndex]);
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [thumbnails]);

  const handleThumbnailClick = (index: number) => {
    setCurrentMainImage(thumbnails[index]);
    setCurrentIndex(index);
  };

  return (
    <section className='blog-event'>
      <div className="blog-event__city">г. Кемерово</div>
      <div className="blog-event__title">Как прошёл мастер-класс по граффити с детьми 7-10 лет</div>
      <div className="blog-event__date">16.05.2024</div>
      <div className="blog-event__image">
        <img src={currentMainImage} alt="Graffiti workshop" className="blog-event__main-image" />
      </div>
      <div className="blog-event__thumbnails">
        {thumbnails.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`Thumbnail ${index + 1}`}
            className={`blog-event__thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      <p className="blog-event__text">
        Мастер-класс по граффити прошёл очень увлекательно и познавательно. 
        Участники изучали историю граффити, основные техники создания уличного искусства, 
        а также пробовали свои силы в создании собственного граффити 
        на специально подготовленных поверхностях. 
        Все были очень заинтересованы и активно участвовали в занятиях. 
        В конце мастер-класса каждый участник получил возможность показать 
        свою работу и поделиться впечатлениями. 
        В целом, мастер-класс оказался очень успешным и вдохновляющим для всех его участников.
      </p>
      <p className="blog-event__subtitile">
        Создано: 16.05.2024
      </p>
    </section>
  );
}

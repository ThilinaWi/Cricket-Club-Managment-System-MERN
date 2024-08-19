import React, { useEffect, useState } from 'react';
import NavBar from '../component/NavBar';
import Footer from '../component/Footer';

const images = [
  {
    url: 'https://www.pixel4k.com/wp-content/uploads/2018/03/Sachin%20Tendulkar%20God%20of%20Cricket659397503.jpg',
    text: 'Achieve Greatness on the Field!',
    
  },
  {
    url: 'https://wallpapers.com/images/hd/sri-lanka-cricket-cheering-2dcj6rospc31gmdj.jpg',
    text: 'Inspire the Next Generation of Champions.',
    
  },
  {
    url: 'https://img.cricketworld.com/images/f-137261/kolkata-knight-riders-phil-salt.jpg',
    text: 'Your Ultimate Cricket Club!',
    
  },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative h-screen -z-20 ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`bg-cover absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image.url})`,
            }}
          >
            <div className="drop-shadow-2xl absolute inset-0 flex flex-col items-center justify-center text-white text-6xl font-extrabold font-poppins uppercase translate-y-[-60px] bg-gradient-to-bl from-slate-100 to-slate-300 bg-clip-text text-transparent text-center">
              <h1 className="text-center mb-4">Unite, Play, Conquer<br /><span className="text-blue-300">{image.text}</span></h1>
              <p className=" lowercase font-light text-lg text-gray-300 ">Sri Lanka No.1 Cricket Practice Club</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;

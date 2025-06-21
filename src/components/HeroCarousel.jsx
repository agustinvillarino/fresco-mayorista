import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentSlide];
  const backgroundStyle = currentImage.imageUrl
    ? {
        backgroundImage: `url(${currentImage.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.85)',
      }
    : {};

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 gradient-bg hero-pattern flex items-center justify-center"
          style={backgroundStyle}
        >
          <div className="text-center space-y-6 p-4 relative z-10">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl font-akzentica tracking-tight"
              style={{ color: '#065a37', textShadow: '0 2px 8px #fff8' }}
            >
              {currentImage.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-2xl max-w-2xl mx-auto font-montserrat"
              style={{ color: '#065a37', textShadow: '0 1px 6px #fff8' }}
            >
              {currentImage.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button className="bg-customAccent text-white hover:bg-customAccent/90 font-bold px-10 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform font-montserrat">
                {currentImage.buttonText || "Explorar Ahora"}
              </Button>
            </motion.div>
          </div>
          {/* Fondo oscuro para mejorar contraste del texto */}
          {currentImage.imageUrl && (
            <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }}></div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 transition-all shadow-md"
      >
        <ChevronLeft className="w-7 h-7" style={{ color: '#f7771f' }} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 transition-all shadow-md"
      >
        <ChevronRight className="w-7 h-7" style={{ color: '#f7771f' }} />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-customAccent scale-125' : 'bg-customAccent/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

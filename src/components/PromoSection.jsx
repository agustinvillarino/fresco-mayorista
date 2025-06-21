import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard.jsx';

const PromoSection = ({ products, onAddToCart, onProductImageClick }) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 320; // Ajusta según el ancho de la tarjeta
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <section className="py-5 px-5 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-6"
      >
        <motion.div 
          className="inline-block p-2 rounded-lg mb-2"
          style={{ background: 'linear-gradient(45deg, #f7771f, #f7b733)'}}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-akzentica text-white">💪 ¡Ofertas Imbatibles! 💪</h2>
        </motion.div>
        <p className="text-base font-montserrat" style={{ color: '#065a37' }}>Aprovecha nuestros descuentos especiales</p>
      </motion.div>
      <div className="relative">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-customAccent text-customAccent rounded-full p-2 shadow"
          style={{ display: products.length > 1 ? 'block' : 'none' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-row space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory w-full justify-center"
          onScroll={e => setScrollPosition(e.target.scrollLeft)}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 90 }}
              className="snap-center min-w-[80vw] max-w-[80vw] sm:min-w-[270px] sm:max-w-[270px]"
            >
              <ProductCard 
                product={product} 
                isPromo={true} 
                onAddToCart={onAddToCart} 
                onProductImageClick={onProductImageClick}
              />
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-customAccent text-customAccent rounded-full p-2 shadow"
          style={{ display: products.length > 1 ? 'block' : 'none' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default PromoSection;

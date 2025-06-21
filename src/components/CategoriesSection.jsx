import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CategoriesSection = ({ categories, onCategoryClick, selectedCategory }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200; 
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <section className="py-6 px-5 w-full overflow-x-hidden" style={{ backgroundColor: '#065a37' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-4"
      >
        <h2 className="text-3xl font-akzentica mb-2 text-center text-white">
          Categorías
        </h2>
      </motion.div>
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide max-w-full justify-center mx-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.04 }}
              onClick={() => onCategoryClick(category.name)}
              className={`flex flex-col items-center min-w-[90px] flex-shrink-0 cursor-pointer group transition-all duration-200`}
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mb-1 border-2 transition-all duration-200
                ${selectedCategory === category.name ? 'border-white ring-4 ring-white/30 bg-transparent' : 'border-white bg-white'}`}
              >
                <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
              </div>
              <h3 className={`font-semibold text-xs font-montserrat text-center mt-0.5 transition-colors duration-200 ${selectedCategory === category.name ? 'text-white' : 'text-white'}`}> 
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

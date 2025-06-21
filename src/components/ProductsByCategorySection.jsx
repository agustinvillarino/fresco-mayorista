import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard.jsx';

const ProductsByCategorySection = ({ productsByCategory, onAddToCart, onProductImageClick }) => {
  const categoriesWithProducts = Object.entries(productsByCategory).filter(([_, products]) => products.length > 0);

  if (categoriesWithProducts.length === 0) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-akzentica mb-4" style={{ color: '#065a37' }}>No se encontraron productos</h2>
          <p className="text-lg" style={{ color: '#065a37' }}>Intenta con otra búsqueda o explora nuestras categorías.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {categoriesWithProducts.map(([categoryName, products]) => (
        <section key={categoryName} className="py-3 px-5 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-2"
          >
            <h2 className="text-2xl font-akzentica mb-1 text-left" style={{ color: '#065a37' }}>{categoryName}</h2>
            <div className="w-20 h-1 rounded-full mb-1" style={{ backgroundColor: '#f7771f' }}></div>
          </motion.div>
          <div className="flex flex-col gap-2">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 90 }}
                className="w-full"
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onProductImageClick={onProductImageClick}
                  compact={true}
                />
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default ProductsByCategorySection;
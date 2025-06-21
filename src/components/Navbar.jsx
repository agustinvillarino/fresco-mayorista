import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Dumbbell, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Navbar = ({ cartItemCount, onCartClick, onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm('');
      onSearch('');
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <div className="w-21 h-20 flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.postimg.cc/q7zXW6n5/LOGO.png" 
                alt="FRESCO Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center"
              >
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="h-10 border-customAccent focus:ring-customAccent focus:border-customAccent rounded-l-md"
                />
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSearchToggle}
              className={`p-3 rounded-full hover:bg-gray-200/50 transition-colors ${isSearchOpen && searchTerm ? 'rounded-r-md bg-gray-200/50' : ''}`}
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Buscar productos"}
            >
              {isSearchOpen ? <X className="w-6 h-6" style={{ color: '#f7771f' }} /> : <Search className="w-6 h-6" style={{ color: '#f7771f' }} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-full shadow-lg text-white"
              style={{ backgroundColor: '#f7771f' }}
              onClick={onCartClick}
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
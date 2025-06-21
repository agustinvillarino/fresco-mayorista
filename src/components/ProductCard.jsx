import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { toast } from '@/components/ui/use-toast';

const ProductCard = ({ product, isPromo = false, onAddToCart, onProductImageClick, compact = false }) => {
  const [quantity, setQuantity] = useState(product.minOrder || 1);

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < (product.minOrder || 1)) {
      value = product.minOrder || 1;
    }
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(product.minOrder || 1, prev - 1));
  };

  const handleAddToCart = () => {
    if (quantity < (product.minOrder || 1)) {
      toast({
        title: "Cantidad mínima no alcanzada",
        description: `Debes agregar al menos ${product.minOrder || 1} ${product.unit} de ${product.name}.`,
        variant: "destructive",
      });
      return;
    }
    onAddToCart(product, quantity);
    setQuantity(product.minOrder || 1); 
  };
  
  const cardVariants = {
    rest: { y: 0, scale: 1, boxShadow: "0px 5px 15px rgba(0,0,0,0.08)" },
    hover: { y: -8, scale: 1.03, boxShadow: "0px 10px 25px rgba(6,90,55,0.1)" }
  };

  if (compact) {
    const [showImgTooltip, setShowImgTooltip] = useState(false);
    const [showCartTooltip, setShowCartTooltip] = useState(false);
    return (
      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm w-full min-h-[90px]">
        <div
          className="flex-shrink-0 mr-3 cursor-pointer relative"
          onClick={() => onProductImageClick(product)}
          onMouseEnter={() => setShowImgTooltip(true)}
          onMouseLeave={() => setShowImgTooltip(false)}
        >
          <img
            src={product.image || 'https://images.unsplash.com/photo-1670341447004-606a07fcfaa7'}
            alt={`Imagen de ${product.name}`}
            className="w-16 h-16 rounded-md object-cover border border-gray-100 hover:scale-105 transition-transform"
          />
          {showImgTooltip && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded shadow z-20 whitespace-nowrap">
              Toca para expandir información
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <h3 className="font-bold text-base text-gray-800 truncate max-w-[180px]">{product.name}</h3>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-customAccent">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">/ {product.unit}</span>
          </div>
          {product.minOrder && (
            <span className="text-[10px] text-gray-400 mt-0.5">Mínimo: {product.minOrder} {product.unit}</span>
          )}
        </div>
        <div className="flex flex-col items-end justify-center ml-2 gap-1">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              className="h-7 w-7 border-customAccent text-customAccent hover:bg-customAccent/10"
              disabled={quantity <= (product.minOrder || 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange}
              min={product.minOrder || 1}
              className="h-7 w-12 text-center border-customAccent focus:ring-customAccent focus:border-customAccent text-xs"
            />
            <Button 
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              className="h-7 w-7 border-customAccent text-customAccent hover:bg-customAccent/10"
            >
              <Plus className="w-3 h-3" />
            </Button>
            <div className="relative">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="icon"
                className="ml-2 h-7 w-7 border-customAccent text-white bg-customAccent hover:bg-customAccent/90 flex items-center justify-center"
                style={{ minWidth: 0 }}
                onMouseEnter={() => setShowCartTooltip(true)}
                onMouseLeave={() => setShowCartTooltip(false)}
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
              {showCartTooltip && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded shadow z-20 whitespace-nowrap">
                  Agregar al carrito
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      className={`${isPromo ? 'product-card border-customAccent/50' : 'bg-white border-gray-200'} rounded-2xl p-5 shadow-lg relative overflow-hidden group flex flex-col h-full font-montserrat`}
    >
      {isPromo && product.discount && (
        <div className="absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-sm" style={{ backgroundColor: '#f7771f' }}>
          -{product.discount}%
        </div>
      )}
      
      <motion.div 
        className="aspect-square bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onProductImageClick(product)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img  alt={`Imagen de ${product.name}`} class="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1670341447004-606a07fcfaa7" />
      </motion.div>

      <div className="space-y-3 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg group-hover:text-customTitle transition-colors font-akzentica" style={{ color: '#065a37' }}>
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mt-1 mb-2 leading-relaxed h-16 overflow-hidden">
            {product.description || "Este producto es ideal para mejorar tu rendimiento y alcanzar tus objetivos fitness. ¡Pruébalo ahora!"}
          </p>

          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-2xl font-bold" style={{ color: '#065a37' }}>${product.price.toFixed(2)}</span>
            {isPromo && product.originalPrice && (
              <span className="text-md text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {product.minOrder && (
            <p className="text-xs font-medium" style={{ color: '#f7771f' }}>Mínimo: {product.minOrder} {product.unit}</p>
          )}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              className="h-9 w-9 border-customAccent text-customAccent hover:bg-customAccent/10"
              disabled={quantity <= (product.minOrder || 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange}
              min={product.minOrder || 1}
              className="h-9 w-16 text-center border-customAccent focus:ring-customAccent focus:border-customAccent"
            />
            <Button 
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              className="h-9 w-9 border-customAccent text-customAccent hover:bg-customAccent/10"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full font-semibold rounded-lg py-2.5 text-sm flex items-center justify-center space-x-2 transform hover:scale-105 transition-transform text-white"
            style={{ backgroundColor: '#f7771f' }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Agregar al Carrito</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
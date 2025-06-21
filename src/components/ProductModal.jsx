import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const ProductModal = ({ product, onClose, onAddToCart }) => {
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
    toast({
      title: "Agregado al carrito",
      description: `${quantity} ${product.unit} de ${product.name} agregado(s) a tu carrito.`,
      className: "bg-green-500 text-white"
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-montserrat"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="aspect-square bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-xl flex items-center justify-center overflow-hidden">
              <img  alt={`Imagen ampliada de ${product.name}`} class="w-full h-full object-contain p-4" src="https://images.unsplash.com/photo-1670341447004-606a07fcfaa7" />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-akzentica mb-2" style={{ color: '#065a37' }}>{product.name}</h2>
                
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {product.description || "Descripción detallada del producto aquí. Explica sus beneficios, características y cómo puede ayudar al usuario a alcanzar sus metas fitness."}
                </p>

                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold" style={{ color: '#065a37' }}>${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-md text-gray-500">/ {product.unit}</span>
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                {product.minOrder && (
                  <p className="text-sm font-medium" style={{ color: '#f7771f' }}>Mínimo de compra: {product.minOrder} {product.unit}</p>
                )}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-10 w-10 border-customAccent text-customAccent hover:bg-customAccent/10"
                    disabled={quantity <= (product.minOrder || 1)}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    min={product.minOrder || 1}
                    className="h-10 w-20 text-center text-lg border-customAccent focus:ring-customAccent focus:border-customAccent"
                  />
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10 border-customAccent text-customAccent hover:bg-customAccent/10"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="w-full font-semibold rounded-lg py-3 text-md flex items-center justify-center space-x-2 text-white"
                  style={{ backgroundColor: '#f7771f' }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Agregar al Carrito</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
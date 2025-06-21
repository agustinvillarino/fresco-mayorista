import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const CartPopup = ({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const handleCheckout = () => {
    toast({
      title: "🚧 ¡Procesando Pago!",
      description: "Esta función aún no está implementada, ¡pero pronto podrás finalizar tu compra! 🚀",
      className: "bg-blue-500 text-white"
    });
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end font-montserrat"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-akzentica" style={{ color: '#065a37' }}>Tu Carrito</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </Button>
            </header>

            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                <ShoppingCart className="w-24 h-24 mb-6 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#065a37' }}>Tu carrito está vacío</h3>
                <p className="text-gray-500">¡Añade algunos productos para empezar!</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img  alt={item.name} class="w-full h-full object-contain" src="https://images.unsplash.com/photo-1670341447004-606a07fcfaa7" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-md" style={{ color: '#065a37' }}>{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} / {item.unit}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-customAccent text-customAccent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= (item.minOrder || 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                          min={item.minOrder || 1}
                          className="h-8 w-12 text-center border-customAccent"
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-customAccent text-customAccent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold" style={{ color: '#065a37' }}>${calculateSubtotal(item).toFixed(2)}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 mt-1"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <footer className="p-6 border-t border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: '#065a37' }}>Subtotal:</span>
                  <span className="text-xl font-bold" style={{ color: '#065a37' }}>${calculateTotal().toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full font-semibold rounded-lg py-3 text-md text-white"
                  style={{ backgroundColor: '#f7771f' }}
                >
                  Finalizar Compra
                </Button>
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;
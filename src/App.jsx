import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar.jsx';
import HeroCarousel from '@/components/HeroCarousel.jsx';
import CategoriesSection from '@/components/CategoriesSection.jsx';
import PromoSection from '@/components/PromoSection.jsx';
import ProductsByCategorySection from '@/components/ProductsByCategorySection.jsx';
import Footer from '@/components/Footer.jsx';
import { initialCarouselImages, initialCategories, initialPromoProducts, initialProductsByCategory } from '@/data/fitnessData.js';
import ProductModal from '@/components/ProductModal.jsx';
import CartPopup from '@/components/CartPopup.jsx';

const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProductsByCategory);
  const [filteredPromoProducts, setFilteredPromoProducts] = useState(initialPromoProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const carouselImages = initialCarouselImages;
  const categories = initialCategories;

  useEffect(() => {
    const allProducts = Object.values(initialProductsByCategory).flat();
    const allPromo = initialPromoProducts;

    if (searchTerm.trim() === '' && !selectedCategory) {
      setFilteredProducts(initialProductsByCategory);
      setFilteredPromoProducts(initialPromoProducts);
      return;
    }

    let filteredByCategory = initialProductsByCategory;
    let filteredPromos = initialPromoProducts;

    if (selectedCategory) {
      filteredByCategory = {};
      if (initialProductsByCategory[selectedCategory]) {
        filteredByCategory[selectedCategory] = initialProductsByCategory[selectedCategory];
      }
      filteredPromos = initialPromoProducts.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const newFilteredPromo = filteredPromos.filter(product => 
        product.name.toLowerCase().includes(lowerSearchTerm)
      );
      filteredPromos = newFilteredPromo;

      const newFilteredByCategory = {};
      Object.keys(filteredByCategory).forEach(category => {
        const productsInCategory = filteredByCategory[category].filter(product =>
          product.name.toLowerCase().includes(lowerSearchTerm)
        );
        if (productsInCategory.length > 0) {
          newFilteredByCategory[category] = productsInCategory;
        }
      });
      filteredByCategory = newFilteredByCategory;
    }

    setFilteredProducts(filteredByCategory);
    setFilteredPromoProducts(filteredPromos);
  }, [searchTerm, selectedCategory]);


  const addToCart = (product, quantity) => {
    if (quantity < (product.minOrder || 1)) {
      toast({
        title: "Cantidad mínima",
        description: `La cantidad mínima para ${product.name} es ${product.minOrder || 1} ${product.unit}.`,
        variant: "destructive",
      });
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    toast({
      title: "Agregado al carrito",
      description: `${quantity} ${product.unit} de ${product.name} agregado(s) a tu carrito.`,
      className: "bg-green-500 text-white"
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito.",
      variant: "destructive"
    });
  };

  const updateQuantityInCart = (productId, newQuantity) => {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart && newQuantity < (productInCart.minOrder || 1)) {
      toast({
        title: "Cantidad mínima",
        description: `La cantidad mínima para ${productInCart.name} es ${productInCart.minOrder || 1} ${productInCart.unit}.`,
        variant: "destructive",
      });
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ).filter(item => item.quantity > 0) 
    );
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const handleProductImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen font-montserrat" style={{ backgroundColor: '#f8f2eb' }}>
      <Navbar 
        cartItemCount={totalCartItems} 
        onCartClick={toggleCartPopup}
        onSearch={handleSearch}
      />
      <HeroCarousel images={carouselImages} />
      <CategoriesSection 
        categories={categories} 
        onCategoryClick={handleCategoryClick} 
        selectedCategory={selectedCategory}
        onClearCategory={() => setSelectedCategory(null)}
      />
      <PromoSection 
        products={filteredPromoProducts} 
        onAddToCart={addToCart} 
        onProductImageClick={handleProductImageClick}
      />
      <ProductsByCategorySection 
        productsByCategory={filteredProducts} 
        onAddToCart={addToCart} 
        onProductImageClick={handleProductImageClick}
      />
      <Footer />
      <Toaster />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} onAddToCart={addToCart} />
      )}
      <CartPopup 
        isOpen={isCartOpen} 
        onClose={toggleCartPopup} 
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantityInCart}
      />
    </div>
  );
};

export default App;
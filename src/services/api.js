// Servicio de API para conectar con Google Apps Script
// Reemplaza esta URL con la que te dé Apps Script al desplegar
const API_BASE_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';

class FrescoAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Función auxiliar para hacer peticiones
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}?path=${endpoint}`;
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en API request:', error);
      throw error;
    }
  }

  // Obtener todos los productos
  async getProducts() {
    return this.makeRequest('products');
  }

  // Obtener productos para la tienda
  async getStoreProducts() {
    return this.makeRequest('products/store');
  }

  // Obtener productos en ofertas
  async getOfferProducts() {
    return this.makeRequest('products/offers');
  }

  // Obtener categorías
  async getCategories() {
    return this.makeRequest('products/categories');
  }

  // Obtener productos por categoría
  async getProductsByCategory(category) {
    return this.makeRequest(`products/category&category=${encodeURIComponent(category)}`);
  }

  // Crear un pedido
  async createOrder(orderData) {
    return this.makeRequest('orders', {
      method: 'POST',
      body: orderData
    });
  }

  // Obtener pedidos
  async getOrders() {
    return this.makeRequest('orders');
  }
}

// Instancia global de la API
export const frescoAPI = new FrescoAPI();

// Hook personalizado para usar la API
export const useFrescoAPI = () => {
  return {
    getProducts: frescoAPI.getProducts.bind(frescoAPI),
    getStoreProducts: frescoAPI.getStoreProducts.bind(frescoAPI),
    getOfferProducts: frescoAPI.getOfferProducts.bind(frescoAPI),
    getCategories: frescoAPI.getCategories.bind(frescoAPI),
    getProductsByCategory: frescoAPI.getProductsByCategory.bind(frescoAPI),
    createOrder: frescoAPI.createOrder.bind(frescoAPI),
    getOrders: frescoAPI.getOrders.bind(frescoAPI)
  };
}; 
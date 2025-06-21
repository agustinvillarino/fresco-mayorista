export const initialCarouselImages = [
  {
    id: 1,
    title: "¡Potencia Tu Entrenamiento!",
    subtitle: "Descubre suplementos y equipos de alta calidad.",
    buttonText: "Ver Ofertas Fitness",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Nueva Línea Fitness",
    subtitle: "Ropa deportiva cómoda y con estilo para tus rutinas.",
    buttonText: "Explorar Colección",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Resultados Reales",
    subtitle: "Alcanza tus metas con nuestros productos estrella.",
    buttonText: "Comprar Ahora",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
  }
];

export const initialCategories = [
  { id: 1, name: "Proteínas", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80" },
  { id: 2, name: "Creatinas", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80" },
  { id: 3, name: "Pre-Entrenos", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" },
  { id: 4, name: "Vitaminas", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80" },
  { id: 5, name: "Accesorios", image: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=200&q=80" },
  { id: 6, name: "Ropa Fit", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80" }
];

export const initialPromoProducts = [
  {
    id: 1,
    name: "Proteína Whey Gold",
    price: 49.99,
    originalPrice: 65.00,
    discount: 23,
    rating: 4.9,
    category: "Proteínas",
    unit: "kg",
    minOrder: 1,
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    price: 22.50,
    originalPrice: 30.00,
    discount: 25,
    rating: 4.8,
    category: "Creatinas",
    unit: "gr",
    minOrder: 300,
  },
  {
    id: 3,
    name: "Leggins Alto Rendimiento",
    price: 35.00,
    originalPrice: 50.00,
    discount: 30,
    rating: 4.7,
    category: "Ropa Fit",
    unit: "uni",
    minOrder: 1,
  },
  {
    id: 4,
    name: "Shaker Pro Series",
    price: 9.99,
    originalPrice: 15.00,
    discount: 33,
    rating: 4.6,
    category: "Accesorios",
    unit: "uni",
    minOrder: 1,
  }
];

export const initialProductsByCategory = {
  "Proteínas": [
    {
      id: 5,
      name: "Proteína Vegana Premium",
      price: 55.00,
      rating: 4.8,
      category: "Proteínas",
      unit: "kg",
      minOrder: 1,
    },
    {
      id: 6,
      name: "Caseína Micelar Nocturna",
      price: 52.75,
      rating: 4.7,
      category: "Proteínas",
      unit: "kg",
      minOrder: 1,
    },
    {
      id: 15,
      name: "Aislado de Suero ISO-XP",
      price: 62.99,
      rating: 4.9,
      category: "Proteínas",
      unit: "kg",
      minOrder: 1,
    }
  ],
  "Creatinas": [
    {
      id: 7,
      name: "Creatina HCL Avanzada",
      price: 28.90,
      rating: 4.9,
      category: "Creatinas",
      unit: "gr",
      minOrder: 150,
    },
    {
      id: 8,
      name: "Pack Creatina + Beta Alanina",
      price: 45.00,
      rating: 4.7,
      category: "Creatinas",
      unit: "pack",
      minOrder: 1,
    }
  ],
  "Accesorios": [
    {
      id: 9,
      name: "Guantes de Gimnasio Pro",
      price: 18.50,
      rating: 4.6,
      category: "Accesorios",
      unit: "par",
      minOrder: 1,
    },
    {
      id: 10,
      name: "Cinturón Lumbar Reforzado",
      price: 32.00,
      rating: 4.8,
      category: "Accesorios",
      unit: "uni",
      minOrder: 1,
    },
    {
      id: 11,
      name: "Bandas de Resistencia (Set 5)",
      price: 25.99,
      rating: 4.5,
      category: "Accesorios",
      unit: "set",
      minOrder: 1,
    }
  ],
   "Ropa Fit": [
    {
      id: 12,
      name: "Camiseta Técnica Transpirable",
      price: 29.99,
      rating: 4.7,
      category: "Ropa Fit",
      unit: "uni",
      minOrder: 1,
    },
    {
      id: 13,
      name: "Shorts Deportivos 2 en 1",
      price: 38.50,
      rating: 4.6,
      category: "Ropa Fit",
      unit: "uni",
      minOrder: 1,
    },
    {
      id: 14,
      name: "Sudadera con Capucha Fitness",
      price: 45.00,
      rating: 4.8,
      category: "Ropa Fit",
      unit: "uni",
      minOrder: 1,
    }
  ]
};
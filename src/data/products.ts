import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Maasai Shuka Red Blanket',
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg',
    inStock: true,
    rating: 4.8,
    totalRatings: 124,
    category: 'attire',
    description: 'Traditional Maasai Shuka blanket in vibrant red with black checkered pattern. Made from high-quality cotton for durability and comfort. Used by Maasai warriors and can be worn as a wrap, blanket or decorative piece.',
    specifications: {
      'Material': 'Cotton',
      'Size': '150cm x 200cm',
      'Color': 'Red with black pattern',
      'Weight': '500g',
      'Origin': 'Kenya',
      'Care': 'Hand wash cold, air dry'
    },
    inPackage: ['1 x Maasai Shuka Blanket'],
    variations: [
      {
        id: 101,
        name: 'Red/Black',
        image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg'
      },
      {
        id: 102,
        name: 'Blue/Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Traditional Maasai Beaded Necklace',
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 85,
    category: 'jewelry',
    description: 'Handcrafted Maasai beaded necklace featuring intricate traditional patterns in vibrant colors. Each necklace is uniquely made by skilled Maasai artisans using techniques passed down through generations.',
    specifications: {
      'Material': 'Glass beads, Cotton thread',
      'Length': '45cm',
      'Weight': '120g',
      'Closure': 'Traditional tie closure',
      'Origin': 'Kenya',
      'Handmade': 'Yes'
    },
    inPackage: ['1 x Beaded Necklace', 'Care Instructions Card'],
    variations: [
      {
        id: 201,
        name: 'Red Pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      },
      {
        id: 202,
        name: 'Blue Pattern',
        image: 'https://cdn.pixabay.com/photo/2024/11/21/19/04/elephant-9214527_1280.jpg'
      }
    ]
  },
  {
    id: 3,
    name: 'Handcrafted Maasai Rungu',
    price: 1500,
    originalPrice: 1900,
    discount: 21,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.7,
    totalRatings: 62,
    category: 'tools',
    description: 'Authentic Maasai Rungu (throwing club) hand-carved from mahogany wood. Traditionally carried by Maasai warriors as a symbol of strength and authority. Each piece is uniquely crafted with attention to detail.',
    specifications: {
      'Material': 'Mahogany wood',
      'Length': '50cm',
      'Weight': '450g',
      'Finish': 'Hand-polished',
      'Origin': 'Kenya',
      'Weather Resistant': 'Yes'
    },
    inPackage: ['1 x Maasai Rungu', 'Display Stand', 'Certificate of Authenticity'],
    variations: [
      {
        id: 301,
        name: 'Classic',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 302,
        name: 'Decorated',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ]
  },
  {
    id: 4,
    name: 'Traditional Maasai Leather Sandals',
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg',
    inStock: false,
    rating: 4.5,
    totalRatings: 48,
    category: 'footwear',
    description: 'Handcrafted leather sandals made using traditional Maasai techniques. Durable, comfortable, and featuring unique Maasai-inspired designs. Perfect for casual wear while supporting authentic indigenous craftsmanship.',
    specifications: {
      'Material': 'Genuine leather',
      'Sole': 'Recycled tire rubber',
      'Available Sizes': '36-45 EU',
      'Closure': 'Slip-on design',
      'Origin': 'Kenya',
      'Care': 'Apply leather conditioner occasionally'
    },
    inPackage: ['1 pair of Maasai leather sandals'],
    variations: [
      {
        id: 401,
        name: 'Brown',
        image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg'
      },
      {
        id: 402,
        name: 'Red',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
  {
    id: 5,
    name: 'Traditional Gourd Water Container',
    price: 1350,
    originalPrice: 1700,
    discount: 21,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.6,
    totalRatings: 37,
    category: 'tools',
    description: 'Authentic hand-crafted gourd water container used by Maasai people. These natural containers keep water cool naturally and feature traditional decorative burning patterns. Each gourd is unique and made following ancestral techniques.',
    specifications: {
      'Material': 'Natural dried gourd',
      'Capacity': '1-2 liters',
      'Height': 'Approximately 25cm',
      'Decoration': 'Traditional burn patterns',
      'Origin': 'Kenya',
      'Care': 'Rinse with water, avoid soaking'
    },
    inPackage: ['1 x Decorated Gourd', 'Carrying Strap', 'Care Instructions'],
    variations: [
      {
        id: 501,
        name: 'Small',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 502,
        name: 'Large',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ]
  },
  {
    id: 6,
    name: 'Maasai Beaded Belt',
    price: 950,
    originalPrice: 1200,
    discount: 21,
    image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg',
    inStock: true,
    rating: 4.7,
    totalRatings: 29,
    category: 'accessories',
    description: 'Beautifully handcrafted Maasai beaded belt featuring traditional geometric patterns. Each belt is created by skilled Maasai artisans using techniques passed down through generations. Perfect as a statement piece for any outfit.',
    specifications: {
      'Material': 'Leather, Glass beads',
      'Length': 'Adjustable 80-100cm',
      'Width': '3cm',
      'Closure': 'Traditional buckle',
      'Origin': 'Kenya',
      'Handmade': 'Yes'
    },
    inPackage: ['1 x Maasai Beaded Belt'],
    variations: [
      {
        id: 601,
        name: 'Multi-colored',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      },
      {
        id: 602,
        name: 'Red/Blue',
        image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg'
      }
    ]
  },
  {
    id: 7,
    name: 'Traditional Maasai Bow and Arrow Set',
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.8,
    totalRatings: 42,
    category: 'tools',
    description: 'Authentic handmade bow and arrow set crafted by Maasai artisans using traditional materials and techniques. This decorative set represents the hunting tools used by Maasai warriors for generations. Perfect for cultural displays and collections.',
    specifications: {
      'Bow Material': 'Flexible hardwood',
      'Bow Length': '120cm',
      'Arrow Material': 'Wood with metal tips',
      'Arrow Length': '75cm',
      'String': 'Natural fiber',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Bow', '3 x Arrows', 'Wall Mounting Hardware', 'Certificate of Authenticity'],
    variations: [
      {
        id: 701,
        name: 'Traditional',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 702,
        name: 'Decorated',
        image: 'https://cdn.pixabay.com/photo/2024/11/21/19/04/elephant-9214527_1280.jpg'
      }
    ]
  },
  {
    id: 8,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 9,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 10,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 11,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 12,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 13,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  },
    {
    id: 15,
    name: 'Maasai Shield (Elongo)',
    price: 3500,
    originalPrice: 4200,
    discount: 17,
    image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg',
    inStock: true,
    rating: 4.9,
    totalRatings: 23,
    category: 'decor',
    description: 'Traditional Maasai shield (Elongo) handcrafted using authentic techniques. Made from buffalo hide with wooden reinforcement and decorated with traditional Maasai designs. A striking decorative piece that represents Maasai warrior culture.',
    specifications: {
      'Material': 'Buffalo hide, Wood',
      'Height': '90cm',
      'Width': '50cm',
      'Weight': '1.2kg',
      'Decoration': 'Traditional patterns',
      'Origin': 'Kenya'
    },
    inPackage: ['1 x Maasai Shield', 'Wall Mounting Kit', 'Certificate of Authenticity'],
    variations: [
      {
        id: 801,
        name: 'Classic Red',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      },
      {
        id: 802,
        name: 'Multi-pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};
import { Order } from '../types';

// Mock orders for the current user (user1@example.com with ID 1)
export const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    products: [
      {
        id: 1,
        name: 'Maasai Shuka Red Blanket',
        price: 2500,
        quantity: 1,
        variation: 'Red/Black',
        image: 'https://cdn.pixabay.com/photo/2021/11/14/02/17/maasai-6792709_1280.jpg'
      },
      {
        id: 2,
        name: 'Traditional Maasai Beaded Necklace',
        price: 1800,
        quantity: 2,
        variation: 'Red Pattern',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      }
    ],
    total: 6100,
    shippingFee: 350,
    status: 'delivered',
    date: '2023-11-15',
    shippingAddress: {
      county: 'Nairobi',
      town: 'CBD'
    }
  },
  {
    id: 2,
    userId: 1,
    products: [
      {
        id: 3,
        name: 'Handcrafted Maasai Rungu',
        price: 1500,
        quantity: 1,
        variation: 'Classic',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ],
    total: 1500,
    shippingFee: 200,
    status: 'shipped',
    date: '2023-12-05',
    shippingAddress: {
      county: 'Nairobi',
      town: 'CBD'
    }
  },
  {
    id: 3,
    userId: 1,
    products: [
      {
        id: 6,
        name: 'Maasai Beaded Belt',
        price: 950,
        quantity: 1,
        variation: 'Multi-colored',
        image: 'https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg'
      },
      {
        id: 5,
        name: 'Traditional Gourd Water Container',
        price: 1350,
        quantity: 1,
        variation: 'Small',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ],
    total: 2300,
    shippingFee: 250,
    status: 'processing',
    date: '2023-12-18',
    shippingAddress: {
      county: 'Nairobi',
      town: 'CBD'
    }
  }
];

// Orders for user 2 (user2@example.com with ID 2)
const user2Orders: Order[] = [
  {
    id: 4,
    userId: 2,
    products: [
      {
        id: 7,
        name: 'Traditional Maasai Bow and Arrow Set',
        price: 2800,
        quantity: 1,
        variation: 'Traditional',
        image: 'https://cdn.pixabay.com/photo/2021/10/31/19/35/tribe-6758620_1280.jpg'
      }
    ],
    total: 2800,
    shippingFee: 300,
    status: 'delivered',
    date: '2023-10-20',
    shippingAddress: {
      county: 'Mombasa',
      town: 'Nyali'
    }
  }
];

// Combine all orders
export const allOrders = [...orders, ...user2Orders];

export const getOrdersByUserId = (userId: number): Order[] => {
  return allOrders.filter(order => order.userId === userId);
};

export const getPendingReviewOrders = (userId: number): Order[] => {
  // In a real application, this would filter orders that have been delivered
  // but don't have reviews yet
  return allOrders.filter(order => 
    order.userId === userId && 
    order.status === 'delivered'
  );
};
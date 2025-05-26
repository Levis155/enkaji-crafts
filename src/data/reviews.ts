import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 101,
    userName: 'Sarah M.',
    title: 'Authentic and beautiful!',
    text: 'I visited Kenya last year and was looking for an authentic Maasai blanket. This one is exactly like what I saw the Maasai people wearing. The colors are vibrant and the quality is excellent. Fast shipping too!',
    rating: 5,
    date: '2023-12-15',
    isVerified: true
  },
  {
    id: 2,
    productId: 1,
    userId: 102,
    userName: 'Michael K.',
    title: 'Versatile and warm',
    text: 'Using this as both a throw blanket in my living room and sometimes as a wrap on cooler evenings. The material is sturdy yet soft. The red color is striking and adds character to my home.',
    rating: 4,
    date: '2023-11-20',
    isVerified: true
  },
  {
    id: 3,
    productId: 2,
    userId: 103,
    userName: 'Jessica T.',
    title: 'Beautiful craftsmanship',
    text: 'This necklace is absolutely stunning! The beadwork is intricate and you can tell it\'s handmade with care. I receive compliments every time I wear it. Love that it supports Maasai artisans directly.',
    rating: 5,
    date: '2023-12-05',
    isVerified: true
  },
  {
    id: 4,
    productId: 3,
    userId: 104,
    userName: 'David R.',
    title: 'Authentic piece of Maasai culture',
    text: 'I\'m a collector of indigenous art and tools from around the world. This rungu is beautifully crafted and feels substantial in the hand. The wood is polished to a nice finish. Great conversation piece in my collection.',
    rating: 5,
    date: '2023-10-18',
    isVerified: true
  },
  {
    id: 5,
    productId: 3,
    userId: 105,
    userName: 'Robert J.',
    title: 'Good quality but smaller than expected',
    text: 'The craftsmanship is excellent and the wood is beautiful. However, I expected it to be slightly larger based on the description. Still a nice piece though.',
    rating: 4,
    date: '2023-11-10',
    isVerified: true
  },
  {
    id: 6,
    productId: 5,
    userId: 106,
    userName: 'Emma L.',
    title: 'Natural water cooling works!',
    text: 'I was skeptical about how well this would actually keep water cool, but it really works! The natural gourd material keeps water refreshingly cool even on hot days. The traditional patterns are beautiful too.',
    rating: 5,
    date: '2023-12-12',
    isVerified: true
  },
  {
    id: 7,
    productId: 7,
    userId: 107,
    userName: 'Thomas K.',
    title: 'Impressive craftsmanship',
    text: 'The bow has a good pull to it and is clearly made by someone who understands traditional bow making. The arrows are well-crafted too. This isn\'t a toy but a genuine cultural artifact. Very pleased with my purchase.',
    rating: 5,
    date: '2023-11-25',
    isVerified: true
  }
];

export const getReviewsByProductId = (productId: number): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

export const getAverageRating = (productId: number): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((total, review) => total + review.rating, 0);
  return sum / productReviews.length;
};
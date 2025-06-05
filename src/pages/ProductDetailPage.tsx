// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import { IoLocationOutline, IoCheckmarkCircle } from "react-icons/io5";
// import { IoIosPricetag, IoIosCalendar } from "react-icons/io";
// import { TbTruckReturn } from "react-icons/tb";
// import { GoShareAndroid } from "react-icons/go";
// import { FaRegHeart } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
//  // @ts-ignore
// import { Navigation } from "swiper";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { getProductById, getRelatedProducts } from "../data/products";
// import { getReviewsByProductId } from "../data/reviews";
// import { Product, Review } from "../types";
// import "../styles/ProductDetailPage.css";

// const ProductDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const { items, updateQuantity, addItem } = useCart();
//   const {
//     isInWishlist,
//     addItem: addToWishlist,
//     removeItem: removeFromWishlist,
//   } = useWishlist();

//   const [product, setProduct] = useState<Product | undefined>(undefined);
//   const [selectedVariation, setSelectedVariation] = useState<
//     number | undefined
//   >(undefined);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     if (id) {
//       const productId = parseInt(id);
//       const foundProduct = getProductById(productId);

//       if (foundProduct) {
//         setProduct(foundProduct);

//         // Set default variation if available
//         if (foundProduct.variations && foundProduct.variations.length > 0) {
//           setSelectedVariation(foundProduct.variations[0].id);
//         }

//         // Get product reviews
//         const productReviews = getReviewsByProductId(productId);
//         setReviews(productReviews);

//         // Get related products
//         const related = getRelatedProducts(productId, 4);
//         setRelatedProducts(related);

//         //check if product is already in cart and set initial state
//         const cartItem = items.find((item) => item.id === productId);
//         if (cartItem) {
//           setCartQuantity(cartItem.quantity);
//         } else {
//           setCartQuantity(0);
//         }
//       }
//     }
//   }, [items, id]);

//   if (!product) {
//     return (
//       <div>
//         <Header />
//         <div className="container loading-container">
//           <p>Loading product...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     const variationName =
//       selectedVariation && product.variations
//         ? product.variations.find((v) => v.id === selectedVariation)?.name
//         : undefined;

//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       discount: product.discount,
//       image:
//         selectedVariation && product.variations
//           ? product.variations.find((v) => v.id === selectedVariation)?.image ||
//             product.image
//           : product.image,
//       quantity: cartQuantity,
//       variation: variationName,
//       inStock: product.inStock,
//     });
//   };

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity <= 0) {
//       updateQuantity(product.id, 0);
//       setCartQuantity(0);
//     } else {
//       updateQuantity(product.id, newQuantity);
//       setCartQuantity(newQuantity);
//     }
//   };

//   const incrementQuantity = () => {
//     handleQuantityChange(cartQuantity + 1);
//   };

//   const decrementQuantity = () => {
//     handleQuantityChange(cartQuantity - 1);
//   };

//   const handleWishlistToggle = () => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         discount: product.discount,
//         image: product.image,
//         inStock: product.inStock,
//       });
//     }
//   };

//   const selectedVariationImage =
//     selectedVariation && product.variations
//       ? product.variations.find((v) => v.id === selectedVariation)?.image
//       : product.image;

//   return (
//     <>
//       <Header />
//       <div className="product-page-wrapper">
//         <div className="product-page-wrapper-col1">
//           <div className="product-container">
//             <div className="product-container-col1">
//               <div className="product-container-col1-img">
//                 <img src={selectedVariationImage} alt={product.name} />
//                 {!product.inStock && (
//                   <div className="out-of-stock-overlay">Out of Stock</div>
//                 )}
//               </div>
//             </div>
//             <div className="product-container-col2">
//               <p className="product-container-col2-headline">{product.name}</p>
//               <p className="product-container-col2-brand">
//                 brand: <span>jbl</span> |{" "}
//                 <span>
//                   <a href="">similar products from jbl</a>
//                 </span>
//               </p>
//               <div className="product-container-price-discount-container">
//                 <p className="product-container-col2-price">
//                   ksh {product.price.toLocaleString()}
//                 </p>

//                 <div className="product-container-discount-container">
//                   <p className="product-container-discounted-figure">
//                     ksh {product.originalPrice.toLocaleString()}
//                   </p>
//                   <p className="product-container-percentage-discount">
//                     -{product.discount}%
//                   </p>
//                 </div>
//               </div>

//               {user ? (
//                 <p className="product-container-col2-shipping">
//                   + shipping of ksh 120 to {user.shippingAddress.county},
//                   {user.shippingAddress.town}.
//                 </p>
//               ) : (
//                 <p className="product-container-col2-shipping">
//                   + shipping of ksh 120 to Nairobi CBD.
//                 </p>
//               )}
//               <div className="product-cont-col2-rating">
//                 <Rating name="read-only" value={4} readOnly />
//               </div>
//               <p className="stock-status">
//                 {product.inStock ? "in stock" : "out of stock"}
//               </p>

//               {product.variations && product.variations.length > 0 && (
//                 <div className="product-cont-col2-variations">
//                   <p>variations</p>
//                   <div className="variations">
//                     {product.variations.map((variation) => (
//                       <div
//                         key={variation.id}
//                         className={
//                           selectedVariation === variation.id
//                             ? "variations-card-clicked"
//                             : "variations-card"
//                         }
//                         onClick={() => setSelectedVariation(variation.id)}
//                       >
//                         <img src={variation.image} alt="" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="product-page-product-details">
//             <p className="product-page-product-details-title">
//               product details
//             </p>
//             <p className="product-page-product-details-body">
//               {product.description}
//             </p>
//           </div>
//           <div className="product-page-product-specifications">
//             <p className="product-page-product-specifications-title">
//               product specifications
//             </p>
//             <div className="product-page-product-specifications-body">
//               <div className="key-features">
//                 <p className="key-features-title">specifications</p>
//                 <div className="key-features-body">
//                   <ul>
//                     {Object.entries(product.specifications).map(
//                       ([key, value]) => (
//                         <li key={key}>
//                           <strong>{key}:</strong> {value}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//               </div>

//               <div className="whats-in-the-box">
//                 <p className="whats-in-the-box-title">what's in the package</p>
//                 <div className="whats-in-the-box-body">
//                   <ul className="package-contents">
//                     {product.inPackage.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="product-page-customer-feedback">
//             <p className="customer-feedback-title">customer feedback</p>

//             {reviews.length === 0 ? (
//               <div className="no-reviews">
//                 <p>This product doesn't have any reviews yet.</p>
//               </div>
//             ) : (
//               <div className="customer-feedback-body">
//                 <div className="customer-feedback-col1">
//                   <p className="customer-feedback-col1-title">
//                     verified ratings ({product.totalRatings})
//                   </p>

//                   <div className="ratings-summary">
//                     <p className="ratings-average">{product.rating}</p>
//                     <div>
//                       <Rating
//                         name="read-only"
//                         value={Math.floor(product.rating)}
//                         readOnly
//                       />
//                     </div>
//                     <p className="total-ratings">
//                       {product.totalRatings} verified ratings
//                     </p>
//                   </div>
//                 </div>

//                 <div className="customer-feedback-col2">
//                   <p className="customer-feedback-col2-title">
//                     product reviews ({reviews.length})
//                   </p>

//                   <div className="customer-feedback-col2-body">
//                     {reviews.map((review) => (
//                       <div key={review.id} className="product-review-card">
//                         <div className="product-review-card-rating">
//                           <Rating
//                             name="read-only"
//                             value={Math.floor(review.rating)}
//                             readOnly
//                           />
//                         </div>

//                         <p className="product-review-card-review-title">
//                           {review.title}
//                         </p>

//                         <p className="product-review-card-review-excerpt">
//                           {review.text}
//                         </p>

//                         <div className="product-review-card-bottom">
//                           <p className="product-review-card-review-details">
//                             {review.date} by {review.userName}
//                           </p>

//                           <p className="verified-purchase">
//                             <IoCheckmarkCircle /> verified purchase
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {relatedProducts.length > 0 && (
//             <div className="product-page-similar-items">
//               <p className="product-page-similar-items-title">
//                 Related products
//               </p>
//               <Swiper
//                 className="similar-products-swiper"
//                 modules={[Navigation]}
//                 navigation={true}
//                 breakpoints={{
//                   320: {
//                     slidesPerView: 1,
//                   },
//                   480: {
//                     slidesPerView: 2,
//                   },
//                   768: {
//                     slidesPerView: 3,
//                   },
//                   1024: {
//                     slidesPerView: 4,
//                   },
//                   1280: {
//                     slidesPerView: 5,
//                   },
//                 }}
//                 spaceBetween={10}
//               >
//                 {relatedProducts.map((product) => (
//                   <SwiperSlide key={product.id}>
//                     <Link
//                       to={`/product/${product.id}`}
//                       className="products-page-similar-items-card"
//                     >
//                       <div className="products-page-similar-items-card-img-wrapper">
//                         <div className="products-page-similar-items-card-img">
//                           <img src={product.image} alt={product.name} />
//                         </div>
//                       </div>
//                       <p className="product-page-similar-items-card-headline">
//                         {product.name}
//                       </p>

//                       <p className="product-page-similar-items-card-price">
//                         Ksh {product.price}
//                       </p>
//                     </Link>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           )}
//         </div>
//         <div className="product-page-wrapper-col2">
//           <div className="product-page-wrapper-col2-title">
//             shipping & delivery
//           </div>
//           <div className="product-page-wrapper-col2-body">
//             <div className="product-page-wrapper-col2-detail">
//               <IoLocationOutline />
//               <p>
//                 <span>ship to:</span>{" "}
//                 {user
//                   ? `${user.shippingAddress.county}, ${user.shippingAddress.town}`
//                   : "Nairobi CBD"}
//               </p>
//             </div>
//             <div className="product-page-wrapper-col2-detail">
//               <IoIosPricetag />
//               <p>
//                 <span>shipping fee: </span>ksh 120
//               </p>
//             </div>
//             <div className="product-page-wrapper-col2-detail">
//               <IoIosCalendar />{" "}
//               <p>
//                 <span>delivery date: </span>may 30 - jun 02
//               </p>
//             </div>
//             <div className="product-page-wrapper-col2-detail">
//               <TbTruckReturn />{" "}
//               <p>
//                 <span>returns & refunds policy:</span>{" "}
//                 <Link to={"#"}>details</Link>
//               </p>
//             </div>
//             <div className="product-page-wrapper-col2-btn">
//               {cartQuantity > 0 ? (
//                 <div className="product-page-cart-control">
//                   <button
//                     className="product-page-cart-decrement-btn"
//                     onClick={decrementQuantity}
//                   >
//                     -
//                   </button>
//                   <p className="product-page-cart-quantity">{cartQuantity}</p>
//                   <button
//                     className="product-page-cart-increment-btn"
//                     onClick={incrementQuantity}
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   className="product-page-wrapper-col2-add-to-cart"
//                   onClick={handleAddToCart}
//                   disabled={!product.inStock}
//                 >
//                   {product.inStock ? "Add to Cart" : "Out of Stock"}
//                 </button>
//               )}
//             </div>

//             <div className="product-page-wrapper-col2-btns">
//               <button>
//                 <GoShareAndroid /> share
//               </button>
//               <button
//                 className={`wishlist-button ${
//                   isInWishlist(product.id) ? "active" : ""
//                 }`}
//                 onClick={handleWishlistToggle}
//               >
//                 <FaRegHeart /> wish
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetailPage;

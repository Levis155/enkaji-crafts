import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rating from "@mui/material/Rating";
import ReactMarkdown from "react-markdown";
import { IoLocationOutline, IoCheckmarkCircle } from "react-icons/io5";
import { IoIosPricetag, IoIosCalendar } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
import useUserStore from "../stores/userStore";
import useWishlistStore from "../stores/wishlistStore";
import useCartStore from "../stores/cartStore";
import { Product } from "../types";
import apiUrl from "../Utils/apiUrl";
import {
  earliestDeliveryDate,
  latestDeliveryDate,
} from "../Utils/deliveryDates";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeItem);
  const cartItem = cart.find((item) => item.id === id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const handleAddToCart = useCartStore((state) => state.addItem);
  const incrementQuantity = useCartStore(
    (state) => state.incrementItemQuantity
  );
  const decrementQuantity = useCartStore(
    (state) => state.decrementItemQuantity
  );
  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const wishlistItem = wishlist.find((item) => item.id === id);

  const {
    isLoading,
    data: product,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ["fetch-product", id],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/products/${id}`);
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data.message;
        setFetchError(serverMessage);
      } else {
        setFetchError("Something went wrong.");
      }
    }
  }, [error]);

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="product-page-loading-container">
          <PulseLoader size={15} color="#e61919" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoading && fetchError) {
    return (
      <div>
        <Header />
        <div className="product-page-error-container">
          <h3>{fetchError}</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      {product && (
        <div className="product-page-wrapper">
          <div className="product-page-wrapper-col1">
            <div className="product-container">
              <div className="product-container-col1">
                <div className="product-container-col1-img">
                  <img src={product.image} alt={product.name} />
                  {!product.inStock && (
                    <div className="out-of-stock-overlay">Out of Stock</div>
                  )}
                </div>
              </div>
              <div className="product-container-col2">
                <p className="product-container-col2-headline">
                  {product.name}
                </p>
                <p className="product-container-col2-brand">
                  category: <span>{product.category}</span> |{" "}
                  <span>
                    <Link to={`/category/${product.category}`}>similar products</Link>
                  </span>
                </p>
                <div className="product-container-price-discount-container">
                  <p className="product-container-col2-price">
                    ksh {product.price}
                  </p>

                  <div className="product-container-discount-container">
                    <p className="product-container-discounted-figure">
                      ksh {product.originalPrice}
                    </p>
                    <p className="product-container-percentage-discount">
                      -
                      {Math.round(
                        100 - (product.price / product.originalPrice) * 100
                      )}
                      %
                    </p>
                  </div>
                </div>

                {user ? (
                  <p className="product-container-col2-shipping">
                    + shipping of ksh 120 to {user.county}, {user.town}.
                  </p>
                ) : (
                  <p className="product-container-col2-shipping">
                    + shipping of ksh 120 to Nairobi CBD.
                  </p>
                )}
                <div className="product-cont-col2-rating">
                  <Rating name="read-only" value={product.averageRating} readOnly />
                </div>
                <p className="stock-status">
                  {product.inStock ? "in stock" : "out of stock"}
                </p>
                <div className="product-page-wrapper-col2-btn">
                  {cartQuantity > 0 ? (
                    <div className="product-page-cart-control">
                      <button
                        className="product-page-cart-decrement-btn"
                        onClick={() => {
                          if (cartQuantity > 1) {
                            decrementQuantity(product.id);
                          } else {
                            removeFromCart(product.id);
                          }
                        }}
                      >
                        -
                      </button>
                      <p className="product-page-cart-quantity">
                        {cartQuantity}
                      </p>
                      <button
                        className="product-page-cart-increment-btn"
                        onClick={() => {
                          incrementQuantity(product.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="product-page-wrapper-col2-add-to-cart"
                      onClick={() => {
                        handleAddToCart({
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          inStock: product.inStock,
                          quantity: 1,
                        });
                      }}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  )}
                </div>
              </div>
              <button
                className="product-detail-wishlist-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!user) {
                    toast.info("You need to be signed in for this action.");
                    return;
                  }

                  if (wishlistItem) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist({
                      id: product?.id,
                      name: product?.name,
                      image: product?.image,
                      price: product?.price,
                      originalPrice: product?.originalPrice,
                      inStock: product?.inStock,
                    });
                  }
                }}
                aria-label={
                  wishlistItem ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {wishlistItem ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            <div className="product-page-product-details">
              <p className="product-page-product-details-title">
                product details
              </p>
              <p className="product-page-product-details-body">
                {product.description}
              </p>
            </div>
            <div className="product-page-product-specifications">
              <p className="product-page-product-specifications-title">
                product specifications
              </p>
              <div className="product-page-product-specifications-body">
                <div className="key-features">
                  <p className="key-features-title">Specifications</p>
                  <div className="key-features-body">
                    <ReactMarkdown>{product.specifications}</ReactMarkdown>
                  </div>
                </div>

                <div className="whats-in-the-box">
                  <p className="whats-in-the-box-title">
                    what's in the package
                  </p>
                  <div className="whats-in-the-box-body">
                    <ReactMarkdown>{product.packageContent}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-page-customer-feedback">
              <p className="customer-feedback-title">customer feedback</p>

              {!product.reviews || product.reviews?.length === 0 ? (
                <div className="no-reviews">
                  <IoChatbubblesOutline />
                  <p>This product doesn't have any reviews yet.</p>
                </div>
              ) : (
                <div className="customer-feedback-body">
                  <div className="customer-feedback-col1">
                    <p className="customer-feedback-col1-title">
                      verified ratings ({product.reviews?.length})
                    </p>

                    <div className="ratings-summary">
                      <p className="ratings-average">{product.averageRating}</p>
                      <div>
                        <Rating
                          name="read-only"
                          value={product.averageRating}
                          readOnly
                          precision={0.5}
                        />
                      </div>
                      <p className="total-ratings">
                        {product.reviews?.length} verified ratings
                      </p>
                    </div>
                  </div>

                  <div className="customer-feedback-col2">
                    <p className="customer-feedback-col2-title">
                      product reviews ({product.reviews?.length})
                    </p>

                    <div className="customer-feedback-col2-body">
                      {product.reviews?.map((review) => (
                        <div key={review.id} className="product-review-card">
                          <div className="product-review-card-rating">
                            <Rating
                              name="read-only"
                              value={Math.floor(review.rating)}
                              readOnly
                            />
                          </div>

                          <p className="product-review-card-review-title">
                            {review.reviewTitle}
                          </p>

                          <p className="product-review-card-review-excerpt">
                            {review.reviewBody}
                          </p>

                          <div className="product-review-card-bottom">
                            <p className="product-review-card-review-details">
                              {format(
                                new Date(review.createdAt || Date.now()),
                                "dd MMM yyyy"
                              )}{" "}
                              by {review.reviewAuthor}
                            </p>

                            <p className="verified-purchase">
                              <IoCheckmarkCircle /> verified purchase
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {product?.category && (
              <RelatedProducts category={product.category} />
            )}
          </div>
          <div className="product-page-wrapper-col2">
            <div className="product-page-wrapper-col2-title">
              shipping & delivery
            </div>
            <div className="product-page-wrapper-col2-body">
              <div className="product-page-wrapper-col2-detail">
                <IoLocationOutline />
                <p>
                  <span>ship to:</span>{" "}
                  {user ? `${user.county}, ${user.town}` : "Nairobi CBD"}
                </p>
              </div>
              <div className="product-page-wrapper-col2-detail">
                <IoIosPricetag />
                <p>
                  <span>shipping fee: </span>ksh 120
                </p>
              </div>
              <div className="product-page-wrapper-col2-detail">
                <IoIosCalendar />{" "}
                <p>
                  <span>delivery date: </span>
                  {earliestDeliveryDate} - {latestDeliveryDate}
                </p>
              </div>
              <div className="product-page-wrapper-col2-detail"></div>
              {/* <div className="product-page-wrapper-col2-btns">
                <button>
                  <GoShareAndroid /> share
                </button>
                <button
                  className={`wishlist-button ${
                    isInWishlist(product.id) ? "active" : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <FaRegHeart /> wish
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetailPage;

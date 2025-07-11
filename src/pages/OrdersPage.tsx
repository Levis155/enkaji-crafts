import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { TextField, Rating, CircularProgress } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { format } from "date-fns";
import { Order, Review } from "../types";
import "../styles/OrdersPage.css";
import formControlStyle from "../Utils/formControlStyles";
import useBrowseProducts from "../hooks/useBrowseProducts";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    reviewTitle: "",
    reviewAuthor: "",
    reviewBody: "",
  });

  const queryClient = useQueryClient();
  const handleShopNow = useBrowseProducts();

  const {
    isLoading,
    isError,
    error,
    data: orders,
  } = useQuery<Order[]>({
    queryKey: ["get-orders-by-user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/orders/user`);
      console.log(response.data);
      return response.data;
    },
  });

  const { mutate: submitReview, isPending: isSubmittingReview } = useMutation({
    mutationKey: ["submit-review-and-update-order"],
    mutationFn: async ({
      review,
      orderItemId,
    }: {
      review: Review;
      orderItemId: string;
    }) => {
      await Promise.all([
        axiosInstance.post(`/reviews`, review),
        axiosInstance.patch(`/order-items/${orderItemId}`, undefined),
      ]);
    },
    onSuccess: () => {
      toast.success("Published Review successfully.");
      queryClient.invalidateQueries({ queryKey: ["get-orders-by-user"] });
    },
    onError: () => {
      toast.error("Error publishing review.");
    },
    onSettled: () => {
      setIsReviewing(false);
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.rating ||
      !formData.reviewTitle ||
      !formData.reviewAuthor ||
      !formData.reviewBody
    ) {
      toast.info("Please fill all fields.");
      return;
    }

    const newReview: Review = {
      productId: selectedProduct.productId,
      reviewAuthor: formData.reviewAuthor,
      reviewTitle: formData.reviewTitle,
      reviewBody: formData.reviewBody,
      rating: formData.rating,
    };

    submitReview({ review: newReview, orderItemId: selectedProduct.id });
  };

  return (
    <>
      {!isReviewing && (
        <div className="orders-page">
          <h1>
            {orders && orders.length > 0
              ? `My Orders (${orders.length})`
              : `My Orders`}
          </h1>

          {!isError && !orders && isLoading && (
            <div className="orders-page-loading-cont">
              <PulseLoader size={15} color="#e61919" />
            </div>
          )}

          {!isLoading && !orders && isError && (
            <div className="orders-page-error-cont">
              <p>{fetchError}</p>
            </div>
          )}

          {!isError && !isLoading && orders && orders.length === 0 && (
            <div className="orders-page empty-orders">
              <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <button className="shop-now-btn" onClick={handleShopNow}>
                  Shop Now
                </button>
              </div>
            </div>
          )}

          {!isLoading &&
            !isError &&
            !isReviewing &&
            orders &&
            orders?.length > 0 && (
              <div className="orders-list">
                {orders.map((order: Order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <div className="order-meta">
                          <span className="order-number">
                            Order #{order.orderNumber}
                          </span>
                          <span className="order-date">
                            Order placed:{" "}
                            {order.createdAt
                              ? format(new Date(order.createdAt), "dd MMM yyyy")
                              : "Unknown"}
                          </span>
                        </div>
                        <div className={`order-status ${order.status}`}>
                          {order.status
                            ? order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)
                            : "Unknown"}
                        </div>
                        <div className="order-ship-to">
                          <span className="order-ship-to-add">
                            Ship to: {order.county}, {order.town}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="order-products">
                      {order.orderItems.map((product, index) => (
                        <div key={index} className="order-product">
                          <div className="order-product-image">
                            <img src={product.image} alt={product.name} />
                          </div>
                          <div className="order-product-details">
                            <h3 className="order-product-name">
                              {product.name}
                            </h3>
                            <div className="order-product-price-qty">
                              <span className="order-product-price">
                                Ksh {product.price}
                              </span>
                              <span className="order-product-quantity">
                                Qty: {product.quantity}
                              </span>
                            </div>
                          </div>

                          {!product.isReviewed &&
                            order.status === "delivered" && (
                              <div className="order-product-actions">
                                <button
                                  onClick={() => {
                                    setIsReviewing(true);
                                    setSelectedProduct(product);
                                  }}
                                  className="review-product-btn"
                                >
                                  <MdOutlineRateReview /> Review product
                                </button>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-totals">
                        <div className="subtotal">
                          <span>Subtotal:</span>
                          <span>
                            Ksh{" "}
                            {order.orderItems.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0
                            )}
                          </span>
                        </div>
                        <div className="shipping-fee">
                          <span>Shipping:</span>
                          <span>Ksh {order.user?.shippingCharge}</span>
                        </div>
                        <div className="order-total">
                          <span>Total:</span>
                          <span>Ksh {order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}

      {isReviewing && (
        <form className="rate-and-review-form" onSubmit={handleSubmitReview}>
          <div className="rate-and-review-form-title">
            <p>rate & review</p>
            <button onClick={() => setIsReviewing(false)}>
              <IoMdClose />
            </button>
          </div>

          <div className="rate-and-review-form-body">
            <div className="rate-container">
              <p className="rate-container-title">
                select the stars to rate the product
              </p>

              <div className="rate-container-card">
                <div className="rate-container-card-col1">
                  <div className="rate-container-card-img">
                    <img src={selectedProduct.image} alt="" />
                  </div>
                </div>

                <div className="rate-container-card-col2">
                  <p className="rate-container-card-product-headline">
                    {selectedProduct.name}
                  </p>
                  <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={(_, newValue) => {
                      setFormData({ ...formData, rating: newValue ?? 0 });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="review-container">
              <p className="review-container-title">leave a review</p>

              <div className="review-container-body">
                <div className="text-field-container">
                  <TextField
                    label="Review Title"
                    variant="outlined"
                    sx={formControlStyle}
                    name="reviewTitle"
                    value={formData.reviewTitle}
                    onChange={handleOnChange}
                    required
                  />
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    sx={formControlStyle}
                    name="reviewAuthor"
                    value={formData.reviewAuthor}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="text-area-container">
                  <TextField
                    label="Detailed Review"
                    multiline
                    rows={7}
                    sx={formControlStyle}
                    name="reviewBody"
                    value={formData.reviewBody}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button className="submit-review-btn" disabled={isSubmittingReview}>
              {isSubmittingReview ? (
                <CircularProgress size="1.3rem" sx={{ color: "white" }} />
              ) : (
                "Submit your Review"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default OrdersPage;

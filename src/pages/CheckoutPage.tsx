import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import {
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import formControlStyle from "../styles/formControlStyles";
import apiUrl from "../Utils/apiUrl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import { Order } from "../types";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [shippingFee] = useState(120); // Default shipping fee
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const inStockItems = cart.filter((item) => item.inStock);

  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    emailAddress: user?.emailAddress,
    phoneNumber: user?.phoneNumber,
    county: user?.county,
    town: user?.town,
  });

const {
  isPending: isPlacingOrder,
  mutate: placeOrder,
} = useMutation<Order, Error, Order>({
  mutationKey: ["make-order"],
  mutationFn: async (order) => {
    const response = await axios.post(`${apiUrl}/orders`, order, {
      withCredentials: true,
    });
    return response.data;
  },
  onSuccess: () => {
    setOrderPlaced(true);
    clearCart();
    console.log("Order placed successfully.");
  },
  onError: (err) => {
    if (axios.isAxiosError(err)) {
      const serverMessage = err.response?.data.message;
      setOrderError(serverMessage);
    } else {
      setOrderError("Something went wrong.");
    }
    toast.error(orderError || "Error placing order");
  },
});

// Mutation for updating user info
const {
  isPending: isUpdatingUser,
  mutate: updateUser,
} = useMutation({
  mutationKey: ["update-user-info"],
  mutationFn: async () => {
    const response = await axios.patch(
      `${apiUrl}/users`,
      {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        county: formData.county,
        town: formData.town,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
  onSuccess: (data) => {
    setUserInfo(data);
    setIsEditingDetails(false);
    setIsEditingAddress(false);
    toast.success("Updated user successfully!");
  },
  onError: (err) => {
    if (axios.isAxiosError(err)) {
      const serverMessage = err.response?.data.message;
      setFormError(serverMessage);
    } else {
      setFormError("Something went wrong.");
    }
  },
});

  useEffect(() => {
    if (!user) {
      navigate("/customer/account");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (inStockItems.length === 0 && !orderPlaced && user) {
      navigate("/cart");
    }
  }, [inStockItems, orderPlaced, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    updateUser();
  };
  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    updateUser();
  };

  const handlePlaceOrder = (order: Order) => {
    setOrderError(null);
    placeOrder(order);
  };

  if (!user) return null;

  return (
    <div>
      <Header />
      {isPlacingOrder && !orderError && !orderPlaced && (
        <div className="checkout-page-loader-cont">
          <PulseLoader size={15} color="#e61919" />
        </div>
      )}

      {!isPlacingOrder && !orderError && orderPlaced && (
        <div className="order-success">
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you for your order. Your order has been placed successfully.
          </p>
          <p>We've sent a confirmation email to {user?.emailAddress}.</p>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {!isPlacingOrder && !orderError && !orderPlaced && (
        <main className="checkout-page">
          <h1>Checkout</h1>

          <div className="checkout-container">
            <div className="checkout-details">
              <section className="customer-info">
                <div className="checkout-section-title">
                  <h2>Customer Information</h2>
                  {!isEditingDetails && (
                    <button
                      className="edit-customer-info"
                      onClick={() => {
                        setFormError(null);
                        setIsEditingDetails(true);
                        setIsEditingAddress(false);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>

                {isEditingDetails ? (
                  <form onSubmit={handleUpdateDetails}>
                    {formError && (
                      <Alert
                        severity="error"
                        sx={{ mb: "1rem", fontSize: "1.4rem" }}
                      >
                        {formError}
                      </Alert>
                    )}
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      sx={formControlStyle}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      label="Email"
                      variant="outlined"
                      sx={formControlStyle}
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      type="tel"
                      sx={formControlStyle}
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="account-page-form-actions">
                      <button
                        type="submit"
                        className="save-button"
                        disabled={isUpdatingUser}
                      >
                        {isUpdatingUser ? (
                          <CircularProgress
                            size="1.3rem"
                            sx={{ color: "white" }}
                          />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setIsEditingDetails(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="info-content">
                    <div className="info-item">
                      <span className="info-label">Name:</span>
                      <span className="info-value">{user?.fullName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{user?.emailAddress}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{user?.phoneNumber}</span>
                    </div>
                  </div>
                )}
              </section>

              <section className="delivery-details">
                <div className="checkout-section-title">
                  <h2>Delivery Details</h2>
                </div>

                <div className="shipping-address">
                  <div className="subsection-header">
                    <h3>Shipping Address</h3>
                    {!isEditingAddress && (
                      <button
                        className="edit-shipping-address"
                        onClick={() => {
                          setFormError(null);
                          setIsEditingDetails(false);
                          setIsEditingAddress(true);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>

                  <div className="address-display">
                    {isEditingAddress ? (
                      <form onSubmit={handleUpdateAddress}>
                        {formError && (
                          <Alert
                            severity="error"
                            sx={{ mb: "1rem", fontSize: "1.4rem" }}
                          >
                            {formError}
                          </Alert>
                        )}
                        <TextField
                          label="County"
                          variant="outlined"
                          sx={formControlStyle}
                          name="county"
                          value={formData.county}
                          onChange={handleInputChange}
                          required
                        />

                        <TextField
                          label="Town"
                          variant="outlined"
                          sx={formControlStyle}
                          name="town"
                          value={formData.town}
                          onChange={handleInputChange}
                          required
                        />

                        <div className="account-page-form-actions">
                          <button
                            type="submit"
                            className="save-button"
                            disabled={isUpdatingUser}
                          >
                            {isUpdatingUser ? (
                              <CircularProgress
                                size="1.3rem"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setIsEditingAddress(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p>
                        {user.county}, {user.town}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shipment">
                  <div className="subsection-header">
                    <h3>Shipment</h3>
                    <button
                      className="modify-cart"
                      onClick={() => navigate("/cart")}
                    >
                      <FaEdit /> Modify Cart
                    </button>
                  </div>

                  <div className="shipment-items">
                    {inStockItems.map((item) => (
                      <div key={item.id} className="shipment-item">
                        <div className="shipment-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="shipment-item-details">
                          <div className="shipment-item-meta">
                            <span className="shipment-item-price">
                              Ksh {item.price}
                            </span>
                            <span className="shipment-item-quantity">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-row items-total">
                <span>Item(s) Total</span>
                <span>Ksh {getTotalPrice()}</span>
              </div>

              <div className="summary-row delivery-fee">
                <span>Delivery Fee</span>
                <span>Ksh {shippingFee}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>Ksh {getTotalPrice() + shippingFee}</span>
              </div>

              <button
                className="place-order-button"
                onClick={() => {
                  handlePlaceOrder({
                    totalPrice: getTotalPrice() + shippingFee,
                    county: user.county,
                    town: user.town,
                    orderItems: inStockItems.map((item) => ({
                      productId: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity,
                      image: item.image,
                    })),
                  });
                }}
                disabled={isEditingAddress}
              >
                Place Order
              </button>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default CheckoutPage;

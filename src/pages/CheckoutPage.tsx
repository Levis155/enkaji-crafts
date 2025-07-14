import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";
import {
  TextField,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  Box,
  FormControlLabel,
} from "@mui/material";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import { Order } from "../types";
import countyTownFeeMap from "../data/regionTownFeeMap";
import { getShippingFee, getTownsForCounty } from "../Utils/shippingUtils";
import formControlStyle from "../Utils/formControlStyles";
import mpesaLogo from "../../src/assets/MicrosoftTeams-image_41.png";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const inStockItems = cart.filter((item) => item.inStock);
  const navigate = useNavigate();

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(
    null
  );
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const [_paymentInitiationError, setPaymentInitiationError] = useState<
    string | null
  >(null);
  const [availableTowns, setAvailableTowns] = useState<string[]>(
    getTownsForCounty(user?.county || "")
  );
  const [initialUserData, setInitialUserData] = useState({
    fullName: user?.fullName || "",
    emailAddress: user?.emailAddress || "",
    phoneNumber: user?.phoneNumber || "",
    county: user?.county || "",
    town: user?.town || "",
    shippingCharge: user?.shippingCharge || 0,
  });

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    emailAddress: user?.emailAddress || "",
    phoneNumber: user?.phoneNumber || "",
    county: user?.county || "",
    town: user?.town || "",
    shippingCharge: user?.shippingCharge || 0,
  });

  const { isPending: isInitiatingPayment, mutate: payAndPlaceOrder } =
    useMutation<Order, Error, Order>({
      mutationKey: ["pay-and-place-order"],
      mutationFn: async (order) => {
        const response = await axiosInstance.post(`/orders`, order);
        return response.data;
      },
      onSuccess: (data) => {
        setCheckoutRequestId(data.checkoutRequestId || null);
        setOrderStatus("pending");
      },
      onError: (err) => {
        let message = "Failed to initiate payment.";
        if (axios.isAxiosError(err)) {
          message = err.response?.data.message || message;
        }
        setPaymentInitiationError(message);
        toast.error(message);
      },
    });

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: async () => {
      const response = await axiosInstance.patch(`/users`, {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        county: formData.county,
        town: formData.town,
        shippingCharge: formData.shippingCharge,
      });
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
    if (inStockItems.length === 0 && orderStatus === null) {
      toast.error("Your cart is empty or items are out of stock");
      navigate("/cart");
    }
  }, [inStockItems, orderStatus, navigate]);

  useEffect(() => {
    if (!checkoutRequestId) return;

    let attempts = 0;
    const interval = setInterval(async () => {
      const res = await axiosInstance.get(
        `/orders/payment-status/${checkoutRequestId}`
      );
      const { status, resultDesc } = res.data;

      if (status !== "pending") {
        clearInterval(interval);
        setOrderStatus(status);
        setOrderResult(resultDesc);
      }

      if (++attempts >= 12) {
        clearInterval(interval);
        setOrderStatus("failed");
        setOrderResult("Payment timed out. Please try again.");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [checkoutRequestId]);

  useEffect(() => {
    if (orderStatus === "processed") {
      clearCart();
    }
  }, [orderStatus]);

  useEffect(() => {
    if (user) {
      setInitialUserData({
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        county: user.county,
        town: user.town,
        shippingCharge: user.shippingCharge,
      });

      setFormData({
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        county: user.county,
        town: user.town,
        shippingCharge: user.shippingCharge,
      });

      setAvailableTowns(getTownsForCounty(user.county));
    }
  }, [user]);

  const handleCountyChange = (e: SelectChangeEvent<string>) => {
    const county = e.target.value;
    const towns = getTownsForCounty(county);

    setFormData((prev) => ({
      ...prev,
      county,
      town: towns.includes(prev.town) ? prev.town : "",
      shippingCharge: 0,
    }));

    setAvailableTowns(towns);
  };

  const handleTownChange = (e: SelectChangeEvent<string>) => {
    const town = e.target.value;
    const fee = getShippingFee(formData.county, town);

    setFormData((prev) => ({
      ...prev,
      town,
      shippingCharge: fee !== undefined ? fee : 0,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancelDetails = () => {
    setIsEditingDetails(false);
    setFormData((prev) => ({
      ...prev,
      fullName: initialUserData.fullName,
      emailAddress: initialUserData.emailAddress,
      phoneNumber: initialUserData.phoneNumber,
    }));
  };

  const handleCancelAddress = () => {
    setIsEditingAddress(false);
    setFormData((prev) => ({
      ...prev,
      county: initialUserData.county,
      town: initialUserData.town,
      shippingCharge: initialUserData.shippingCharge,
    }));
    setAvailableTowns(getTownsForCounty(initialUserData.county));
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

  const handlePayAndPlaceOrder = () => {
    setPaymentInitiationError(null);
    const order = {
      totalPrice: getTotalPrice() + formData.shippingCharge,
      phoneNumber: formData.phoneNumber,
      county: formData.county,
      town: formData.town,
      orderItems: inStockItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };
    payAndPlaceOrder(order);
  };

  return (
    <div>
      <Header />

      {orderStatus === "pending" && (
        <div className="order-status-cont">
          <PropagateLoader size={15} color="#e61919" />
          <p>Please check your phone to complete payment...</p>
        </div>
      )}

      {orderStatus === "processed" && (
        <div className="order-status-cont">
          <DotLottieReact
            src="https://lottie.host/65fb76dc-6876-43ae-9718-23afa1b7490e/V8j8o34irq.lottie"
            className="lottie-animation"
            loop={false}
            autoplay
          />
          <h2 className="order-success">
            Payment received! Your order was placed.
          </h2>
          <p>
            We've sent a confirmation email to{" "}
            <strong>{user?.emailAddress}</strong>.
          </p>
          <button
            onClick={() => navigate("/customer/orders")}
            className="continue-shopping-btn"
          >
            <MdOutlineKeyboardDoubleArrowLeft /> View Orders
          </button>
        </div>
      )}

      {orderStatus === "failed" && (
        <div className="order-status-cont">
          <p className="payment-failed">Payment failed: {orderResult}</p>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            <MdOutlineKeyboardDoubleArrowLeft /> Back To Shop
          </button>
        </div>
      )}

      {!orderStatus && (
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
                        onClick={handleCancelDetails}
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

                        <FormControl fullWidth sx={formControlStyle}>
                          <InputLabel>County</InputLabel>
                          <Select
                            value={formData.county}
                            label="County"
                            onChange={handleCountyChange}
                            name="county"
                            required
                          >
                            {Object.keys(countyTownFeeMap)
                              .sort((a, b) => a.localeCompare(b))
                              .map((county) => (
                                <MenuItem key={county} value={county}>
                                  {county.replace(" County", "")}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          sx={formControlStyle}
                          disabled={!formData.county}
                        >
                          <InputLabel>Town</InputLabel>
                          <Select
                            value={formData.town}
                            label="Town"
                            onChange={handleTownChange}
                            name="town"
                            required
                          >
                            {availableTowns
                              .sort((a, b) => a.localeCompare(b))
                              .map((town) => (
                                <MenuItem key={town} value={town}>
                                  {town}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        {formData.shippingCharge > 0 && (
                          <Alert
                            severity="info"
                            sx={{ mt: 2, fontSize: "1.2rem" }}
                          >
                            Shipping Fee: Ksh {formData.shippingCharge}
                          </Alert>
                        )}

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
                            onClick={handleCancelAddress}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p>
                        {user?.county}, {user?.town}
                        <br />
                        <span className="shipping-fee-display">
                          Shipping Fee: Ksh {user?.shippingCharge}
                        </span>
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

              <section className="payment-method">
                <div className="checkout-section-title">
                  <h2>Payment Method</h2>
                </div>

                <div className="payment-method-body">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="payment method"
                      name="payment-method"
                      value="mpesa"
                    >
                      <FormControlLabel
                        value="mpesa"
                        control={
                          <Radio
                            color="primary"
                            sx={{
                              "&.Mui-checked": {
                                color: "#e61919",
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: 12,
                                transform: "scale(1.5)",
                              },
                            }}
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                              backgroundColor: "#f8f8f8",
                            }}
                          >
                            <img
                              src={mpesaLogo}
                              alt="M-Pesa"
                              style={{
                                height: "80px",
                              }}
                            />
                          </Box>
                        }
                        disabled
                      />
                    </RadioGroup>
                  </FormControl>
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
                <span>Shipping Fee</span>
                <span>Ksh {formData.shippingCharge}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>Ksh {getTotalPrice() + formData.shippingCharge}</span>
              </div>

              <button
                className="place-order-button"
                onClick={handlePayAndPlaceOrder}
                disabled={
                  isInitiatingPayment || isEditingAddress || isEditingDetails
                }
              >
                {isInitiatingPayment ? (
                  <CircularProgress size="1.3rem" sx={{ color: "white" }} />
                ) : (
                  "Pay & Place Order"
                )}
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

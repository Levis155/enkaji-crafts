import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { PulseLoader } from "react-spinners";
// @ts-ignore
import { Navigation } from "swiper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../styles/RelatedProducts.css";
import apiUrl from "../Utils/apiUrl";
import { Product } from "../types";
import { Link } from "react-router-dom";

interface RelatedProductsProps {
  category: string;
}

const RelatedProducts = ({ category }: RelatedProductsProps) => {
    const [fetchError, setFetchError] = useState<string | null>(null);

  const { isLoading, data:relatedProducts, isError, error } = useQuery<Product[]>({
    queryKey: ["fetch-related-products"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/products/category/${category}`
      );
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


  return (
    <div className="product-page-similar-items">
      <p className="product-page-similar-items-title">More products</p>
      {isLoading && <div className="related-products-loading-cont"><PulseLoader size={15} color="#e61919" />{" "}</div>}
      { !isLoading && fetchError && <div className="related-products-error-cont"><p>{fetchError}</p></div>}
      <Swiper
        className="similar-products-swiper"
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={10}
      >
        {relatedProducts?.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className="products-page-similar-items-card"
            >
              <div className="products-page-similar-items-card-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>

              <p className="product-page-similar-items-card-headline">
                {product.name}
              </p>

              <p className="product-page-similar-items-card-price">
                Ksh {product.price}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;

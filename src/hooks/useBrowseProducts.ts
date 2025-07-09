import { useNavigate } from "react-router-dom";

const useBrowseProducts = () => {
  const navigate = useNavigate();

  const browseProducts = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("crafts-collection");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  };

  return browseProducts;
};

export default useBrowseProducts;
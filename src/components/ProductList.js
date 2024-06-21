import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to group products by category
  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  // Group products by category
  const groupedProducts = groupProductsByCategory(products);

  // Toggle function to show/hide details
  const toggleDetails = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, showDetails: !product.showDetails };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="container" style={{ backgroundColor: "#e3f2fd" }}>
      <h1 className="py-4 text-center" style={{ color: "darkcyan" }}>
        Product List
      </h1>
      {Object.keys(groupedProducts).map((category) => (
        <div
          key={category}
          className="my-4"
          style={{ color: "rgb(160, 154, 154)" }}
        >
          <h2 className="pb-3">{category}</h2>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {groupedProducts[category].map((product) => (
              <div key={product.id} className="col">
                <div
                  className="card h-100 d-flex flex-column justify-content-center align-items-center"
                  style={{ backgroundColor: "rgb(215, 240, 232)" }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{
                      width: "60%",
                      height: "auto",
                      padding: "50px",
                      objectFit: "cover",
                      backgroundColor: "transparent",
                    }}
                  />
                  <div className="card-body text-center py-0 mb-1">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="py-0">
                      <button
                        className="btn btn-lg btn-light w-100% border-0"
                        style={{ color: "e3f2fd" }}
                        onClick={() => toggleDetails(product.id)}
                      >
                        {product.showDetails ? "Hide Details" : "Show Details"}
                      </button>
                    </div>
                    {product.showDetails && (
                      <div className="mt-3">
                        <p className="card-text" style={{ color: "grey" }}>
                          {product.description}
                        </p>
                        <p className="card-text" style={{ color: "green" }}>
                          Rating: {product.rating.rate} ({product.rating.count}{" "}
                          reviews)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

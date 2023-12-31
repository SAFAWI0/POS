import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import "./Categories.css";
import AppContainer from "../Contaner/container";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/v1/category", requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result))
      .catch((error) => console.log("error", error));
  };
  console.log(categories);
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Header />
      <AppContainer>
        <div  className="categories-container">
          {categories.map((el, i) => (
            <div key={i} className="category-item">
              <h1>{el.name}</h1>
              
            </div>
          ))}
        </div>
      </AppContainer>
    </div>
  );
};

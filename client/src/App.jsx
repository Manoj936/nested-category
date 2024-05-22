// src/App.js
import React, { useEffect, useState } from "react";
import { Container, List } from "@material-ui/core";
import CategoryTree from "./Components/CategoryTree";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/NestedCategory");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data); // Access the nested data property
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <Container className="container">
      <h1>Category Tree</h1>
      {categories && categories.length > 0 && (
        <List>
          {categories.map((category) => (
            <CategoryTree key={category._id} category={category} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default App;

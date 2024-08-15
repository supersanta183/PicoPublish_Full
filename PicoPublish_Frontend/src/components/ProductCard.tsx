import React from "react";
import { useState } from "react";

import IProduct from "./interfaces/IProduct";

interface ProductCardProps {
  product: IProduct;
  fetchProducts: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  fetchProducts,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [type, setType] = useState<string>(product.type);

  const handleDelete = async () => {
    try {
      let id = product.id;
      const response = await fetch(`http://localhost:5090/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Check if the response body is empty
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setEditing(false);
    try {
      let id = product.id;
      let newProduct = product;
      newProduct.name = name !== "" ? name : product.name;
      newProduct.description = description !== "" ? description : product.description;
      newProduct.type = type;

      const response = await fetch(`http://localhost:5090/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      // Check if the response body is empty
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setType(category);
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="card shadow-xl w-1/2">
        <div className="card-body flex items-center">
          {editing && (
            <div className="flex flex-col">
              <input
                type="text"
                placeholder={product.name}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder={product.description}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                  {type}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={() => handleCategoryChange("NAIL")}>NAIL</a>
                  </li>
                  <li>
                    <a onClick={() => handleCategoryChange("HAMMER")}>HAMMER</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!editing && (
            <div className="flex flex-col">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <a>Type: {product.type}</a>
              <a>Id: {product.id}</a>
            </div>
          )}
        </div>
        <div className="card-actions justify-end mb-2 mx-2">
          {!editing && (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
          {editing && (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Confirm
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import IProduct from "@/components/interfaces/IProduct";
import { ProductCategories } from "@/components/interfaces/ProductCategories";

const page = () => {
  const [Id, setId] = useState<null | number>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("Hover");

  const tryMakeProductObj = (): IProduct | null => {
    if (!Id) {
      return null;
    }
    if (name === "") {
      return null;
    }
    if (description === "") {
      return null;
    }
    if (!ProductCategories.includes(type)) {
      return null;
    }

    let newProduct: IProduct = {
      id: Id,
      name: name,
      description: description,
      type: type,
    };
    return newProduct;
  };

  const handleSubmit = async () => {
    let newProduct = tryMakeProductObj();
    if (!newProduct) {
      console.log("not valid product");
      return;
    }

    try {
      const response = await fetch("http://localhost:5090/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();
      console.log("Product added:", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setType(category);
  }

  return (
    <div className="flex flex-col m-2 items-center justify-center min-h-screen gap-5">
      <div className="flex items-center">
        <a className="">Category: </a>
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

      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="ID"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setId(Number(e.target.value))}
      />

      <div className="btn" onClick={() => handleSubmit()}>
        Add item
      </div>
    </div>
  );
};

export default page;

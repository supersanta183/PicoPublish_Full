"use client";
import React from "react";
import { useState, useEffect } from "react";

import IProduct from "../../components/interfaces/IProduct";
import PageContext from "@/components/interfaces/PageContext";
import ProductCard from "@/components/ProductCard";

const page = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>("Select filter");
  const [pageNumber, setPageNumber] = useState<number>(0);

  const fetch_products = async () => {
    let selectedFilter = "";
    if (filter !== "Select filter") {
      selectedFilter = filter;
    }

    const response = await fetch(
      `http://localhost:5090/products?page=${pageNumber}&type=${selectedFilter}`
    );
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetch_products();
  }, []);

  useEffect(() => {
    fetch_products();
  }, [filter, pageNumber]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className="min-h-screen">
      {data.length === 0 && <div>You have no products</div>}

      {data && data.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <a className="">Filter: </a>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                {filter}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => handleFilterChange("NAIL")}>NAIL</a>
                </li>
                <li>
                  <a onClick={() => handleFilterChange("HAMMER")}>HAMMER</a>
                </li>
                <li>
                  <a onClick={() => handleFilterChange("Select filter")}>
                    Show all
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {data.map((product) => (
            <ProductCard key={product.id} product={product} fetchProducts={fetch_products} />
          ))}
        </div>
      )}
      <div className="flex items-center justify-center my-2">
        {pageNumber > 0 &&
        (
          <div className="btn" onClick={() => setPageNumber(pageNumber - 1)}>
          Last page
        </div>
        )}
        <div className="btn" onClick={() => setPageNumber(pageNumber + 1)}>
          Next page
        </div>
      </div>
    </div>
  );
};

export default page;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchProductsParams } from "./types";

const parse = require("parse-link-header");

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: fetchProductsParams) => {
    const { currentCategory, _page } = params;
    const category = currentCategory.toLowerCase();

    const resp = await axios.get(
      `http://localhost:3001/products?category=${category}&_page=${_page}&_limit=4`
    );

    const paginationLinks = parse(`${resp.headers.link}`);
    return { paginationLinks, data: resp.data, category };
  }
);

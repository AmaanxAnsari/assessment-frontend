// api.js
import axios from "axios";
const API_URL = `${process.env.API_URL}`;

export async function apiGet(url) {
  const apiData = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return apiData;
}

export async function apiPost(url, body) {
  const apiData = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return apiData;
}

export async function apiPut(url, body) {
  const apiData = await axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return apiData;
}

export async function apiDelete(url) {
  const apiData = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return apiData;
}

// APi's

//Categories
export async function getAllCategories() {
  return apiGet(`${API_URL}/categories`);
}

export async function getCategoryById(id) {
  return apiGet(`${API_URL}/categories/${id}`);
}

export async function createCategory(body) {
  return apiPost(`${API_URL}/categories`, body);
}

export async function updateCategory(id, body) {
  const url = `${API_URL}/categories/${id}`;
  const apiData = await apiPut(url, body);
  return apiData;
}

export async function deleteCategory(id) {
  return apiDelete(`${API_URL}/categories/${id}`);
}

//Products

export async function getAllProducts() {
  return apiGet(`${API_URL}/products`);
}

export async function getProductById(id) {
  return apiGet(`${API_URL}/products/${id}`);
}

export async function createProduct(body) {
  return apiPost(`${API_URL}/products`, body);
}

export async function updateProduct(id, body) {
  const url = `${API_URL}/products/${id}`;
  const apiData = await apiPut(url, body);
  return apiData;
}
export async function deleteProduct(id) {
  return apiDelete(`${API_URL}/products/${id}`);
}

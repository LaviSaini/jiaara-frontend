import Axios from "axios";


export async function getProducts({
  id = null,
  page = null,
  perPage = null,
  categoryId = null,
  onSale = null,
  status = null,
  paginate = false,
  orderby = null,
  order = null,
} = {}) {

  const params = {
    id,
    page,
    per_page: perPage,
    category: categoryId,
    on_sale: onSale,
    status,
    paginate,
    orderby,
    order
  };

  const apiParams = {};

  for (const key in params) {
    if (params[key] !== null) {
      apiParams[key] = params[key];
    }
  }

  apiParams.keys = Object.keys(apiParams);

  try {
    const { data } = await Axios.get(`/products/getProducts`, {
      params: apiParams
    });

    return data;
  }
  catch (error) {
    console.error("Error fetching Products from the Frontend.", error);
    return [];
  }
};



export async function getProductsByIds({ ids = [] }) {

  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("No product IDs provided.");
    }

    const { data } = await Axios.get(`/products/getProductsByIds`, {
      params: {
        'ids[]': ids
      }
    });

    return data;
  }
  catch (error) {
    console.error("Error fetching Products from the Frontend:", error.message);
    return {
      products: [],
      error: error.message
    };
  }
}
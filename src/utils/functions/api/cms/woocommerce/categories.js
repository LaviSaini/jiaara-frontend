import Axios from "axios";
import https from 'https';
const axiosInstance = Axios.create({
  baseURL: 'https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/', // Replace with actual URL
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  },
});

export async function getCategories({
  page = 1,
  perPage = 100,
  parent = null,
} = {}) {
  const apiParams = {
    page,
    per_page: perPage,
    parent: parent ?? 0, // Default to 0 if null
    keys: ['page', 'per_page', 'parent'],
  };

  try {
    console.log('Fetching categories with params:', apiParams);
    const { data } = await Axios.get('/api/getCategories', {
      params: apiParams,
      headers: {
        "Content-Type": "application/json",

      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

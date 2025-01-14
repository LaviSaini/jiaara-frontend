import Axios from "axios";


export async function getProductsAnalytics({
  page = 1,
  perPage = 100,
  period = null,
  orderby = null,
  order = null,
  paginate = null,
  status = null
} = {}) {

  const apiParams = {
    page,
    per_page: perPage,
  };

  if (period !== null) {
    apiParams.period = period;
  }

  if (orderby !== null) {
    apiParams.orderby = orderby;
  }

  if (order !== null) {
    apiParams.order = order;
  }

  if (paginate !== null) {
    apiParams.paginate = paginate;
  }

  if (status !== null) {
    apiParams.status = status;
  }

  apiParams.keys = Object.keys(apiParams);

  try {
    const { data } = await Axios.get(`/analytics/getProductsAnalytics`, {
      params: apiParams
    });

    return data;
  }
  catch (error) {
    console.error("Error fetching Analytics from the Frontend.", error);
    return [];
  }
};
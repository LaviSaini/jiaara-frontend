import Axios from "axios";


export async function getShipping({
  zoneId = null,
  methodId = null,
} = {}) {

  const params = {
    zone_id: zoneId,
    method_id: methodId
  };

  const apiParams = {};

  for (const key in params) {
    if (params[key] !== null) {
      apiParams[key] = params[key];
    }
  }

  apiParams.keys = Object.keys(apiParams);

  try {
    const { data } = await Axios.get(`/shipping/getShipping`, {
      params: apiParams
    });

    return data;
  }
  catch (error) {
    console.error("Error fetching Shipping Information from the Frontend.", error);
    return [];
  }
};
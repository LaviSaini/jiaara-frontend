import Axios from "axios";


export async function getCollections({
  page = 1,
  perPage = 100,
  parentCategoryId = 15,
} = {}) {

  const apiParams = {
    page,
    per_page: perPage,
    parent: parentCategoryId,
  };

  apiParams.keys = Object.keys(apiParams);

  try {
    const { data } = await Axios.get(`/collections/getCollections`, {
      params: apiParams
    });

    return data;
  }
  catch (error) {
    console.error("Error fetching Collections from the Frontend.", error);
    return [];
  }
};

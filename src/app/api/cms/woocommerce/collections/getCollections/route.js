import { WooCommerceAPI } from "@/app/api/cms/woocommerce/config";

import convertValue from "@/utils/functions/general/convertValue";


export async function GET(req) {
  
  const allCollections = [];
  const { searchParams: params } = new URL(req.url);

  const keys = params.getAll("keys[]");
  const apiParams = {};

  for (const key of keys) {
    const value = params.get(key);
    apiParams[key] = convertValue(value);
  }

  let page = apiParams.page;

  try {
    while (true) {
      const { data } = await WooCommerceAPI.get("/products/categories", {
        baseURL: "https://cms.jiaarajewellery.com/wp-json/wc/v3",  // Override here
        params: apiParams,
      });
      

      if (data.length === 0) break;

      const collections = data.map(collection => ({
        id: collection?.id,
        name: collection?.name,
        slug: collection?.slug,
        image: collection?.image ? collection?.image.src : null,
        count: collection?.count
      }));

      allCollections.push(...collections);
      apiParams.page = ++page;
    }

    return new Response(JSON.stringify(allCollections), { status: 200 });
  }
  catch (error) {
    return new Response(JSON.stringify({
        error: "Error fetching Collections from the backend",
        details: error.message
      }), { status: 500 }
    );
  }
}

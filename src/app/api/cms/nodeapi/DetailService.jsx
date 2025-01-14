import Axios from 'axios';
const httpService = Axios.create({
    baseURL: 'http://localhost:9122/api/v1'
});

export async function sendContactUsEmail(requestObject) {
    const response = await httpService.post('/payment/send-mail', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function getCartlist(userId) {
    const response = await httpService.get(`/get-cart-list/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function addToCartService(requestObject) {
    const response = await httpService.post('/cart/add-cart', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function getCartListService(userId) {
    const response = await httpService.get(`/cart/get-cart-list/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function deleteCartItem(userId, productId) {
    const requestObject = {
        userId: userId,
        productId: productId
    }
    const response = await httpService.post('/cart/delete-item', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function addToWishListService(requestObject) {
    const response = await httpService.post('/wishlist/add-wishlist', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function deleteWishListService(userId, productId) {
    const requestObject = {
        userId: userId,
        productId: productId
    }
    const response = await httpService.post('/wishlist/delete', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function getWishListService(userId) {
    const response = await httpService.get(`/wishlist/get-wishlist/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
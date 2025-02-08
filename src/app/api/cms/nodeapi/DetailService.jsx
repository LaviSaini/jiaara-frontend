import Axios from 'axios';
const httpService = Axios.create({
    baseURL: 'https://13.60.62.146/api/v1'
});
const wpService = Axios.create({
    baseURL: 'https://cms.jiaarajewellery.com/wp-json/wc/v3/'
})
const wpServicev2 = Axios.create({
    baseURL: 'https://cms.jiaarajewellery.com/wp-json/wp/v2/'
})
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
export async function deleteAllWishListService(userId) {
    const response = await httpService.delete(`/wishlist/delete-all-wishlist/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function getRelatedProductIdsService(productId) {
    const response = await wpService.get(`getRelatedProduct?${productId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;

}
export async function gerProductDetailService() {
    const response = await wpService.get('https://www.jiaarajewellery.com/api/cms/woocommerce/products/29393', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function createAccountService(requestObject) {
    const response = await httpService.post('/auth/signUp', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function loginService(requestObject) {
    const response = await httpService.post('/auth/login', requestObject, {
        headers: {
            "Content-Type": 'application/json'
        }
    })
    return response.data;
}
export async function sendCodeService(email) {
    const response = await httpService.post('/auth/send-reset-password-mail', { email: email }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function verifyOtpService(email, otp) {
    const response = await httpService.post('/auth/verify-otp', { email: email, otp: otp }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function updatePasswordService(email, password) {
    const response = await httpService.post('/auth/forget-password', { password: password, email: email }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function validateCouponService(coupon) {
    const response = await wpServicev2.post('validate', { coupon_code: coupon }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}
export async function createPaymentOrder(requestObject) {
    const response = await httpService.post('/payment/create-order', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export async function verifyPaymentService(requestObject) {
    const response = await httpService.post('/payment/verify-payment', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response?.data;
}
export async function createOrderService(requestObject) {
    const response = await wpService.post(`orders?consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6`, requestObject, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response
}
export async function finalCallService(requestObject) {
    const response = await httpService.post('/cart/final-order', requestObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
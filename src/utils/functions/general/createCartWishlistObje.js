export default function createObjCommanFunction(data) {
    const reqObj = {

        "user_id": '',
        "cart_id": '',
        "created_date": '',
        "product_id": data?.id,
        "quantity": 0,
        "img": data?.images[0].src,
        "price": data?.price,
        "name": data?.name,
        "status": 's'

    }
    return reqObj
}
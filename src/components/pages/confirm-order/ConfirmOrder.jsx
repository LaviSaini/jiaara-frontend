
'use Client';

import { getOrderDetailById } from "@/app/api/cms/nodeapi/DetailService";
import { loaderData } from "@/redux/slices/loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


export default function ConfirmOrder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDetail, setOrderDetail] = useState(null);
  const fetchOrderDetail = async (orderId) => {
    dispatch(loaderData.add(true))
    try {
      const response = await getOrderDetailById(orderId);
      console.log(response)
      if (response?.response?.success) {
        if (response?.response?.data.products?.length == 0) {
          fetchOrderDetail(orderId);
          return;
        }
        setOrderDetail(response?.response?.data)
        const subTotal = response?.response?.data?.products?.reduce((sum, item) => sum + item.total, 0)
        const shipping = response?.response?.data?.products?.reduce((sum, item) => sum + item.shippingAmount, 0)
        setSubTotal(subTotal);
        setShippingPrice(shipping)
      } else {
        toast("Something Went Wrong!", { type: 'error' })
      }
      dispatch(loaderData.clear())
    } catch (error) {
      toast("Something Went Wrong!", { type: 'error' })
      dispatch(loaderData.clear())
    }

  }
  useEffect(() => {
    const orderId = localStorage.getItem('id');
    if (!orderId) {
      router.push('/')
    } else {
      fetchOrderDetail(orderId)
    }
    return () => {
      localStorage.removeItem('id')
    }
  }, [])
  return (
    <>
      <div className="min-h-screen bg-[#F5EDE3] flex justify-center items-center p-8">
        <div className="bg-white py-2 px-10 rounded-2xl shadow-lg w-full max-w-4xl">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-green-500 text-6xl">✔️</span>
            </div>
            <h2 className="font-content text-3xl text-gray-700 font-semibold tracking-wider">Thank You</h2>
            <p className="font-content text-3xl text-gray-700 font-semibold tracking-wider">Your order has been received</p>
            <p className="text-md text-gray-700 mt-2">We’ll send tracking info when your order ships.</p>
          </div>

          <div className="my-8 border-t border-gray-500"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <h3 className="font-semibold">Order details</h3>
              <p className="flex justify-between text-sm text-black mt-2">Order number <span className="text-gray-500">{orderDetail?.orderDetails?.orderNumber}</span></p>
              <p className="flex justify-between text-sm text-black mt-1">Date <span className="text-gray-500">{orderDetail?.orderDetails?.date}</span></p>
              <p className="flex justify-between text-sm text-black mt-1">Payment method <span className="text-gray-500">{orderDetail?.orderDetails?.paymentMethos}</span></p>

              <div className="my-6 border-t border-gray-500"></div>

              <h3 className="font-semibold">Customer details</h3>
              <p className="text-md  text-black font-medium mt-2">Contact</p>
              <p className="text-sm  text-black mt-2">Email: {orderDetail?.customerDetails?.email}</p>
              <p className="text-sm  text-black mt-1">Phone: {orderDetail?.customerDetails?.phone}</p>
              <p className="text-md  text-black font-medium mt-3">Billing address</p>
              <p className="text-sm  text-black mt-1">{orderDetail?.customerDetails?.billingAddress?.first_name} {orderDetail?.customerDetails?.billingAddress?.last_name}<br /> {orderDetail?.customerDetails?.billingAddress?.address_1}<br /> {orderDetail?.customerDetails?.billingAddress?.city}, {orderDetail?.customerDetails?.billingAddress?.country} {orderDetail?.customerDetails?.billingAddress?.postcode}</p>
            </div>

            <div>
              <h3 className="font-semibold">Products</h3>
              <div className="space-y-4 mt-2">
                {orderDetail?.products?.map((product, index) => (
                  <div key={index} className="flex justify-content: space-between; align-items: flex-start;">
                    <div className="w-[70px]">

                      <Image src={product.image} alt={product.title} width={70} height={70} className="rounded-md border h-[70px] w-[70px]" />
                    </div>
                    <div className="flex w-[calc(100%-70px)]">
                      <div className="ms-2">
                        <p className="font-medium text-sm">{product.title}</p>
                        {/* <p className="text-gray-700 text-xs">COLOUR: {product.color}</p> */}
                        <p className="text-gray-700 text-xs">QTY: {product.quantity}</p>
                      </div>
                      <div className="ml-auto font-medium min-w-[80px] text-end">₹ {product.total.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-gray-500"></div>

              <div className="text-right text-sm w-[50%] float-right">
                <p className="flex justify-between font-medium tracking-wide">Subtotal: <span className="font-semibold">₹ {subTotal.toLocaleString()}</span></p>
                <p className="flex justify-between font-medium tracking-wide">Shipping: <span className="font-semibold">₹ {shippingPrice.toLocaleString()}</span></p>
                <p className="flex justify-between font-medium tracking-wide">Total:    <span className="font-semibold">₹ {(subTotal + shippingPrice).toLocaleString()}</span></p>
              </div>
            </div>
          </div>

          <div className="my-8 text-center text-sm text-primaryFont">
            <p>If you have any questions, concerns or suggestions,<br /> please email us: <a href="mailto:support@jiaara.com" className="text-blue-500">support@jiaara.com</a></p>
            <div className="flex justify-center space-x-4 mt-4">
              <span>📷</span>
              <span>📘</span>
              <span>📩</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
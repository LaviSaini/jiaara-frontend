// components/SlideCart.js
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { buyNow } from '@/redux/slices/buyNow';
import { toast } from 'react-toastify';
import { createOrderService, createPaymentOrder, finalCallService, validateCouponService, verifyPaymentService } from '@/app/api/cms/nodeapi/DetailService';


export default function SlideCart({ isOpen, onClose, item }) {
    const [processingText, setProcessingText] = useState('');
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [coupon, setCoupon] = useState({ value: '' });
    const [inValidCouponError, setInValidCouponError] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponDescText, setCouponDescText] = useState('');
    const [coupontPercentage, setCouponPercentage] = useState(0);
    const [couponType, setCouponType] = useState('');
    const [couponAmount, setCouponAmount] = useState(0);
    const [isCouponApplying, setIsCouponApplying] = useState(false);
    const handleChangeCouponValue = (e) => {
        setCoupon({ value: e.target.value });
    };
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
    const [summaryOpen, setSummaryOpen] = useState(false);
    const buyNowList = useSelector(data => data.buyNowReducer);
    const dispatch = useDispatch();
    const [detail, setDetail] = useState(null);
    useEffect(() => {
        if (buyNowList) {
            setDetail(buyNowList[0])
        }
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on unmount
        return () => {
            // dispatch(buyNow.clear());
            setSummaryOpen(false);
            setFormData({
                phone: '',
                firstName: '',
                lastName: '',
                flat: '',
                city: '',
                state: '',
                pincode: '',
                email: '',
            })
            setErrors({})
            setInValidCouponError(false);
            setIsCouponApplied(false);
            setCouponDescText('');
            setCouponPercentage(0);
            setCouponAmount(0);
            setCouponType('')
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);
    useEffect(() => {
        setDetail(buyNowList[0])


    }, [buyNowList])
    useEffect(() => {
        if (isCouponApplied && couponType != 'fixed') {
            const totalSum = (detail?.price * detail?.quantity)
            const amount = Math.round((coupontPercentage * totalSum) / 100);
            setCouponAmount(amount)
        }
    }, [detail])
    const [formData, setFormData] = useState({
        phone: '',
        firstName: '',
        lastName: '',
        flat: '',
        city: '',
        state: '',
        pincode: '',
        email: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };
    const handleQuantity = (type) => {
        // debugger
        if (type == 'inc') {
            dispatch(buyNow.increaseQty(detail?.product_id))
        } else {
            dispatch(buyNow.decreaseQty(detail?.product_id))
        }
    }
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Enter valid 10-digit phone number';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.flat) newErrors.flat = 'Flat/house details required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email';
        }

        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Send data to backend or do next step
            createOrder();
        }
    };
    const [couponError, setCouponError] = useState(false);
    const onApplyCoupon = async () => {
        if (coupon?.value == '') {
            setCouponError(true);
            setTimeout(() => {
                setCouponError(false);
            }, 3000)
            return;
        }
        if (!isCouponApplied) {
            setIsCouponApplying(true);
            const response = await validateCouponService(coupon?.value);
            if (response?.message == "false") {
                setInValidCouponError(true);
                setCouponDescText('Invalid Coupon!')
                setTimeout(() => {
                    setCouponDescText('');
                    setInValidCouponError(false)
                }, 3000)
            } else {
                setCouponDescText(response?.details);
                if (response?.type == 'fixed') {
                    setCouponAmount(response?.value)
                } else {
                    const totalSum = (detail?.price * detail?.quantity)
                    const amount = Math.round((response?.value * totalSum) / 100);
                    setCouponAmount(amount)
                    setCouponPercentage(response?.value)
                }
                setCouponType(response?.type)
                setIsCouponApplied(true);

            }
            setIsCouponApplying(false)
        } else {
            setCouponAmount(0);
            setCouponDescText('');
            setIsCouponApplied(false);
            setCouponType('');
            setCoupon({ value: '' })
        }

    }
    const createOrder = async () => {
        const scriptLoaded = await loadRazorpayScript();
        if (scriptLoaded) {
            const totalPriceArray = buyNowList.map((element) => element.price * element?.quantity);
            const productIds = buyNowList.map(element => element?.product_id);
            let totalSum = totalPriceArray.reduce((acc, cur) => acc + cur, 0);
            let discount = 0;
            if (isCouponApplied) {
                discount = couponAmount;
            }
            const obj = {
                amount: totalSum - discount,
                currency: 'INR',
                userId: null,
                productId: productIds
            }
            try {
                setProcessingText('Processing payment...')
                setOrderProcessing(true);
                const response = await createPaymentOrder(obj)
                if (response?.response?.success) {
                    setOrderProcessing(false)
                    const orderId = response?.response?.data?.order_id;
                    const options = {
                        key: 'rzp_test_UvSPbsmSimh3H2', // Your Razorpay key ID
                        amount: (totalSum - discount) * 100, // Amount in paise (e.g., 50000 paise = 500 INR)
                        currency: 'INR',
                        // name: 'Testing',
                        // description: 'Test Transaction',// Optional: add your logo URL
                        id: orderId, // Order ID received from the backend
                        handler: function (response2) {
                            // Success callback, handle success logic
                            // setPaymentId(response.razorpay_payment_id)
                            verifyPayment(response2.razorpay_payment_id, totalSum - discount, 'INR', response?.response?.data?.paymentId)
                            // alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);

                            // You can also send the payment details to your backend to verify the payment
                            // verifyPayment(response);
                        },
                        prefill: {
                            name: formData?.firstName + " " + formData?.lastName, // Prefill the user's name, email, etc.
                            email: formData?.email,
                            contact: formData?.phone
                        },
                        modal: {
                            // 👇 This triggers when popup is closed without completing payment
                            ondismiss: function () {
                                setProcessingText('');
                                setOrderProcessing(false);
                            }
                        },
                        theme: {
                            color: '#F37254'
                        }
                    };
                    const razorpay = new window.Razorpay(options);
                    razorpay.open();
                } else {
                    setProcessingText('');
                    toast('Something Went Wrong!', { type: 'error' })
                    setOrderProcessing(false);
                }
            } catch (error) {
                toast("Something Went Wrong!", { type: 'error' })
            }
        } else {
            toast('Something Went Wrong!', { type: 'error' })
        }
    }
    const verifyPayment = async (orderId, amount, currency, customPaymentId) => {
        const requestObject = {
            amount: amount,
            payment_order_Id: orderId,
            currency: currency,
            customPaymentId: customPaymentId
        }
        try {
            setProcessingText('verifying payment...')
            setOrderProcessing(true);
            const response = await verifyPaymentService(requestObject);
            if (response?.response?.success) {
                const list = buyNowList.map((element) => {
                    return {
                        product_id: element?.product_id,
                        quantity: element?.quantity
                    }
                })
                const couponList = [];
                if (isCouponApplied) {
                    couponList.push({ code: coupon?.value });
                }
                let orderData = {
                    payment_method: "Razorpay",
                    payment_method_title: "Razor Pay",
                    set_paid: true,
                    customer_id: null,
                    status: 'completed',
                    billing: {
                        first_name: formData?.firstName,
                        last_name: formData?.lastName,
                        address_1: formData?.flat,
                        city: formData?.city,
                        state: formData?.state,
                        postcode: formData?.pincode,
                        country: "IN",
                        email: formData?.email,
                        phone: formData?.phone
                    },
                    shipping: {
                        first_name: formData?.firstName,
                        last_name: formData?.lastName,
                        address_1: formData?.flat,
                        city: formData?.city,
                        state: formData?.state,
                        postcode: formData?.pincode,
                        country: 'IN',
                        phone: formData?.phone
                    },
                    line_items: list,
                    coupon_lines: couponList
                }
                try {
                    setProcessingText('creating order...');
                    const response = await createOrderService(orderData);
                    if (response?.status == '201') {
                        const req = {
                            userId: null,
                            orderId: response?.data?.id,
                            customPaymentId: customPaymentId,
                            isBuyNow: true
                        }
                        const finalResponse = await finalCallService(req);
                        if (finalResponse?.response?.success) {
                            toast("Order Placed Successfully!", { type: 'success' });
                            let obj = {
                                list: buyNowList,
                                data: orderData,
                                orderNumber: response?.data?.id
                            }
                            localStorage.setItem('order-data', JSON.stringify(obj))
                            setOrderProcessing(true);
                            setProcessingText('');
                            onClose('auto');

                        } else {
                            setProcessingText(false);
                            setOrderProcessing(false);
                            toast("Something went wrong!", { type: 'error' })
                        }
                    } else {
                        setProcessingText(false);
                        setOrderProcessing(false);
                        toast("Something went wrong!!", { type: 'error' })
                    }
                } catch (error) {
                    (error)
                    setProcessingText(false);
                    setOrderProcessing(false);
                    toast("Unable to create Order!!!", { type: 'error' })
                }
            } else {
                toast('Something Went Wrong!!!!', { type: 'error' })
                setProcessingText('');
                setOrderProcessing(false);
            }
            // setProcessingText('');
            // setOrderProcessing(false)
        } catch (error) {
            setProcessingText('');
            toast('Something Went Wrong!', { type: 'error' })
            setOrderProcessing(false);
        }
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <>

                    {/* BACKDROP */}
                    < motion.div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose} // Clicking backdrop closes the cart
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full  shadow-lg z-50 pl-4 pr-4 pt-2 overflow-y-auto rounded-tl-[50px] rounded-bl-[50px] bg-primaryBackground"
                    >
                        <div className='flex justify-between items-center mb-3'>
                            <div className="app-brand img-cont-wrapper" >
                                <div className="img-cont size-[70px] relative">
                                    <Image
                                        fill
                                        src='/assets/logos/jiaara-black.png'
                                        alt="brand-logo"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                        quality={80}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end cursor-pointer" onClick={() => onClose('self')}>
                                <Icon icon={'/assets/icons/close.png'} className="relative size-[15px]   " />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col w-full max-w-md mx-auto">
                            <div className="flex justify-between w-100">
                                <div>
                                    <p className="text-base font-semibold text-primaryFont">
                                        Order summary <span className="text-sm font-normal text-gray-500">({detail?.quantity} Item)</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {
                                        detail?.sale ?
                                            <span class="line-through text-gray-400">₹{(detail?.regularPrice) * (detail?.quantity)}.00</span>
                                            :
                                            ''
                                    }
                                    <span className="text-base font-semibold text-gray-900">₹{!isCouponApplied ? (detail?.price) * (detail?.quantity) : ((detail?.price) * (detail?.quantity) - couponAmount)}</span>

                                    {
                                        summaryOpen ?
                                            <svg onClick={() => setSummaryOpen(false)} xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="#6B7280"
                                                class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            :
                                            <svg onClick={() => setSummaryOpen(true)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-500"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                    }




                                </div>
                            </div>
                            {
                                isCouponApplied ?
                                    <span dangerouslySetInnerHTML={{ __html: couponDescText }} className={`${inValidCouponError ? 'text-red-500' : 'text-green-500 '} text-xs`}></span>
                                    :
                                    ''
                            }
                            {/* Animated summary section */}
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${summaryOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div class="p-4 space-y-4 max-w-md mx-auto">
                                    <div class="flex items-start gap-4 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                                        <img src={detail?.img} alt="product" class="w-16 h-16 object-cover rounded-md" />
                                        <div>
                                            <h2 class="font-medium text-primaryFont">{detail?.name}</h2>
                                            <p class="text-sm font-semibold text-primaryFont flex items-center mt-2">Qty:


                                                {/* <span class="font-bold">{detail?.quantity}</span> */}
                                                <div class="flex items-center ml-2">
                                                    <button class="bg-primaryFont text-white px-4 py-2 rounded-l-md text-xl h-[35px] w-[35px] flex items-center justify-center" onClick={() => handleQuantity('inc')}>+</button>

                                                    <div class="bg-white text-purple-900 px-4 py-2 text-md font-medium h-[35px] w-[35px] flex items-center justify-center">
                                                        {detail?.quantity}
                                                    </div>

                                                    <button class="bg-primaryFont text-white px-4 py-2 rounded-r-md text-xl h-[35px] w-[35px] flex items-center justify-center" onClick={() => handleQuantity('dec')}>−</button>
                                                </div>



                                            </p>
                                            <div class="flex items-center gap-2 mt-2">
                                                <span class="font-semibold text-primaryFont">₹{detail?.price}.00</span>
                                                {
                                                    detail?.sale ?
                                                        <span class="line-through text-gray-400">₹{detail?.regularPrice}.00</span>
                                                        :
                                                        ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-white p-4 rounded-md shadow-sm space-y-3">
                                        <h3 class="font-semibold text-lg text-primaryFont">Bill summary</h3>

                                        <div class="flex justify-between text-sm">
                                            <span className='text-primaryFont'>Sub total</span>
                                            <span className='text-primaryFont'>₹{(detail?.regularPrice) * (detail?.quantity)}.00</span>
                                        </div>
                                        {
                                            detail?.sale ?
                                                <div class="flex justify-between text-sm text-green-600">
                                                    <span>Discount on MRP</span>
                                                    <span>- ₹{(detail?.regularPrice * detail?.quantity) - (detail?.price * detail?.quantity)}.00</span>
                                                </div>
                                                :
                                                ''
                                        }
                                        {
                                            isCouponApplied ?
                                                <div class="flex justify-between text-sm text-green-600">
                                                    <span>Coupon Discount</span>
                                                    <span>- ₹{couponAmount}.00</span>
                                                </div>
                                                :
                                                ''
                                        }

                                        <hr class="my-2 border-gray-200" />

                                        <div class="flex justify-between font-semibold text-primaryFont">
                                            <span>Total amount</span>
                                            <span>₹{((detail?.price) * (detail?.quantity)) - couponAmount}.00</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <form className='m-0' >
                            <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm mt-3">
                                <label className="block text-sm font-semibold text-primaryFont mb-2">Contact number <span className="text-red-500">*</span></label>
                                <div className={`flex items-center bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}>
                                    <div className="flex items-center space-x-1 text-gray-600 text-sm font-medium pr-3 border-r border-gray-300">
                                        <span className="text-lg">🇮🇳</span>
                                        <span>+91</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="10-digit phone number"
                                        className="flex-1 ml-3 bg-transparent outline-none text-gray-600 placeholder-gray-400"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4 mt-3">
                                <h2 className="text-lg font-semibold text-primaryFont">Add shipping address</h2>

                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <label className="block text-sm text-primaryFont font-medium mb-1">First name<span className="text-red-500">*</span></label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                                            className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-sm text-primaryFont font-medium mb-1">Last name<span className="text-red-500">*</span></label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                                            className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-primaryFont font-medium mb-1">Address(Flat,area,street,village)<span className="text-red-500">*</span></label>
                                    <input type="text" name="flat" value={formData.flat} onChange={handleChange}
                                        className={`w-full border ${errors.flat ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                    {errors.flat && <p className="text-red-500 text-xs mt-1">{errors.flat}</p>}
                                </div>



                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <label className="block text-sm text-primaryFont font-medium mb-1">City<span className="text-red-500">*</span></label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange}
                                            className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-sm text-primaryFont font-medium mb-1">State<span className="text-red-500">*</span></label>
                                        <input type="text" name="state" value={formData.state} onChange={handleChange}
                                            className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-primaryFont font-medium mb-1">Pincode<span className="text-red-500">*</span></label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                                        className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-primaryFont font-medium mb-1">E-mail<span className="text-red-500">*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <p className="text-xs text-gray-500 italic">Order delivery details will be sent here</p>

                                {/* <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700">
                                    Submit
                                </button> */}
                            </div>
                        </form>

                        <div class={`p-4 bg-white rounded-xl shadow-sm max-w-md space-y-1 mt-3 ${isCouponApplying ? 'opacity-50 cursor-none' : ''}`}>
                            <div class="flex items-center border border-blue-200 rounded-md px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5 text-green-700 mr-2" viewBox="0 0 24 24">
                                    <path d="M19.41 10.59 13.41 4.59a2 2 0 0 0-2.82 0L4.59 10.59a2 2 0 0 0 0 2.82l6 6a2 2 0 0 0 2.82 0l6-6a2 2 0 0 0 0-2.82zM12 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={coupon?.value}
                                    onChange={handleChangeCouponValue}
                                    class="flex-1 outline-none border-none text-black placeholder:text-gray-400"
                                />

                                <button class="text-blue-600 font-medium text-sm ml-2" onClick={() => onApplyCoupon()}>{isCouponApplied ? 'Remove' : 'Apply'}</button>
                            </div>
                            {
                                couponError ?
                                    <span className='text-xs text-red-500'>Please Enter Coupon Code!</span>
                                    :
                                    ""
                            }
                            {
                                isCouponApplied ?
                                    <span dangerouslySetInnerHTML={{ __html: couponDescText }} className={`${inValidCouponError ? 'text-red-500' : 'text-green-500 '} text-xs`}></span>
                                    :
                                    inValidCouponError ?
                                        <span className='text-xs text-red-500'>
                                            {couponDescText}
                                        </span>
                                        :
                                        ''
                            }

                        </div>

                        <button onClick={() => handleSubmit()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-3 mb-5">
                            Checkout
                        </button>
                        <div id="overlay-loader" class={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col ${orderProcessing ? "" : 'hidden'}`}>
                            <div class="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div><br></br><div className='text-xl text-white'>{processingText}</div>
                        </div>
                    </motion.div>
                </>
            )}

        </AnimatePresence>
    );
}

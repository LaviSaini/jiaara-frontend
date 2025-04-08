
'use Client';

import Image from "next/image";


export default function ConfirmOrder(){
   return(
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

        <div className="grid grid-cols-2 gap-20">
          <div>
            <h3 className="font-semibold">Order details</h3>
            <p className="flex justify-between text-sm text-black mt-2">Order number <span className="text-gray-500">12345678910</span></p>
            <p className="flex justify-between text-sm text-black mt-1">Date <span className="text-gray-500">Oct 23, 2023</span></p>
            <p className="flex justify-between text-sm text-black mt-1">Payment method <span className="text-gray-500">Mastercard ending with 7890</span></p>

            <div className="my-6 border-t border-gray-500"></div>

            <h3 className="font-semibold">Customer details</h3>
            <p className="text-md  text-black font-medium mt-2">Contact</p>
            <p className="text-sm  text-black mt-2">Email: himanshuverma544@gmail.com</p>
            <p className="text-sm  text-black mt-1">Phone: 9876543210</p>
            <p className="text-md  text-black font-medium mt-3">Billing address</p>
            <p className="text-sm  text-black mt-1">Daniel Bergamot<br/> 3589/s, canondale Road<br/> Chicago, IL 607890</p>
          </div>

          <div>
            <h3 className="font-semibold">Products</h3>
            <div className="space-y-4 mt-2">
              {[
                { name: 'ETCH CHAIN BRACELET', color: 'GOLD', price: 9200, quantity: 1, image: '' },
                { name: 'HEART PEARLS HOOPS', color: 'GOLD', price: 6300, quantity: 1, image: '' },
                { name: 'DANGBURY RING', color: 'GOLD', price: 7500, quantity: 1, image: '' }
              ].map((product, index) => (
                <div key={index} className="flex justify-content: space-between; align-items: flex-start;">
                  <Image src={product.image} alt={product.name} width={70} height={50} className="rounded-md border" />
                  <div className="ms-5">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-gray-700 text-xs">COLOUR: {product.color}</p>
                    <p className="text-gray-700 text-xs">QTY: {product.quantity}</p>
                  </div>
                  <p className="ml-auto font-medium">₹ {product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-500"></div>

            <div className="text-right text-sm w-[50%] float-right">
              <p className="flex justify-between font-medium tracking-wide">Subtotal: <span className="font-semibold">₹23,000.00</span></p>
              <p className="flex justify-between font-medium tracking-wide">Shipping: <span className="font-semibold">₹70</span></p>
              <p className="flex justify-between font-medium tracking-wide">Total:    <span className="font-semibold">₹23,000.00</span></p>
            </div>
          </div>
        </div>

        <div className="my-8 text-center text-sm text-primaryFont">
          <p>If you have any questions, concerns or suggestions,<br/> please email us: <a href="mailto:support@jiaara.com" className="text-blue-500">support@jiaara.com</a></p>
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
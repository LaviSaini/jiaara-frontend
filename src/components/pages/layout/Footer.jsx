export default function Footer() {
  return (
    <footer className="bg-[#5D2C55] text-white py-10 lg:px-16 px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-4 footerForMob">
        {/* Company Info */}
        <div className="lg:col-span-4 ">
          <h2 className="text-2xl font-bold">JIAARA</h2>
          <h5 className="mt-4 text-lg font-bold">
          Jiara Creations Private Limited</h5>
          <p className="text-sm leading-relaxed">
            1003, Bldg-8, Sandstone Society, Unique Garden,<br />
            Kanakia Layout, Mira Road, Thane-East,<br />
            Bhayander 401107
          </p>
          <p className="mt-4 text-sm">
            jiaracreations@gmail.com<br />
            www.amazon.in/jiara<br />
            www.instagram.com/jiarajewellery
          </p>
          <p className="mt-4 font-bold text-lg">+91 6396872895</p>
        </div>

        <div className="lg:col-span-5 ">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-4">JIAARA</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Store Locator</li>
                {/* <li>Careers</li> */}
                <li>Term of service</li>
                {/* <li>Jewelry Care</li> */}
                {/* <li>Sitemap</li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">SOCIAL</h3>
              <ul className="space-y-2 text-sm">
                <li>Instagram</li>
                <li>YouTube</li>
                <li>Pinterest</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">CUSTOMER CARE</h3>
              <ul className="space-y-2 text-sm">
                <li>Contact Us</li>
                {/* <li>FAQ&#39;s</li> */}
                <li>Shipping Policy</li>
                {/* <li>Returns and Exchanges</li> */}
                {/* <li>Refund Policy</li> */}
                {/* <li>Track Order</li> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-3">
          <h3 className="font-semibold text-lg mb-4">JOIN NEWSLETTER</h3>
          <div className="mt-2 flex items-center border-b border-white newsLetter">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent w-full text-sm focus:outline-none text-white placeholder-white py-1"
            />
            <button className="ml-2 text-white">➜</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import './SignupForm.css';

export default function VerifyMail() {
  return (
    <>
      <div className="mt-12 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-medium text-center mb-4">Verify Your Email</h1>
          <p className="text-center text-gray-600 text-sm mb-6 mx-8">
            Please enter the 4 digit code to himanshuverma544@gmail.com
          </p>

          <div className="flex justify-center gap-4" style={{ marginTop: '50px' }}>
            <div className="inputBox border-b-2 border-fuchsia-950 pb-2">
              <input type="text" maxlength="1" className="w-12 h-12 text-center text-xl text-gray-900 bg-pink-100 rounded-md outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <div className="inputBox border-b-2 border-fuchsia-950 pb-2">
              <input type="text" maxlength="1" className="w-12 h-12 text-center text-xl text-gray-900 bg-pink-100 rounded-md outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <div className="inputBox border-b-2 border-fuchsia-950 pb-2">
              <input type="text" maxlength="1" className="w-12 h-12 text-center text-xl text-gray-900 bg-pink-100 rounded-md outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <div className="inputBox border-b-2 border-fuchsia-950 pb-2">
              <input type="text" maxlength="1" className="w-12 h-12 text-center text-xl text-gray-900 bg-pink-100 rounded-md outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
          </div>
          <p class="text-sm text-center text-gray-600" style={{marginTop: '100px'}}>
            <a href="#" class="font-medium text-primaryFont-600 hover:underline">Resend Code</a>
          </p>
          <div style={{display:'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '30px'}}>
          <button
            type="submit"
            className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
          >
            Verify
          </button>
          </div>
        </div>
      </div>

    </>
  );
}
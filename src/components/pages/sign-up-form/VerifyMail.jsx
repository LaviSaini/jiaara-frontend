// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import './SignupForm.css';
import { useRef, useState } from "react";
import { sendCodeService, verifyOtpService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import CreatePass from "./CreatePass";

export default function VerifyMail({ email }) {
  const inputRefs = useRef([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // Move to the next input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus(); // Move to the previous input
    }
  };
  const resentOtp = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const response = await sendCodeService(email);
    setIsProcessing(false)
    if (response?.response?.success) {
      toast(`${response?.response?.message}`, { type: 'success' })
    } else {
      toast('Something Went Wrog!', { type: 'error' })
    }
  }

  const verify = async () => {
    const otp = inputRefs.current.map((input) => input.value).join(""); // Get values and join them
    console.log("OTP Entered:", otp);
    const response = await verifyOtpService(email, otp);
    if (response?.response?.success) {
      toast(`${response?.response?.message}`, { type: 'success' })
      setIsVerified(true);

    } else {
      toast(`${response?.response?.message}`, { type: "error" })
    }
  }
  return (
    <>
      {
        !isVerified ?
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md" style={{ opacity: isProcessing ? 0.5 : 1 }}>
              <h1 className="text-2xl font-medium text-center mb-4">Verify Your Email</h1>
              <p className="text-center text-gray-600 text-sm mb-6 mx-8">
                Please enter the 4 digit code to {email}
              </p>

              <div className="flex justify-center gap-4" style={{ marginTop: '50px' }}>
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="inputBox border-b-2 border-fuchsia-950 pb-2">
                    <input
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl text-gray-900 bg-pink-100 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ))}

              </div>
              <p class="text-sm text-center text-gray-600" style={{ marginTop: '100px' }}>
                <a onClick={() => resentOtp()} class="font-medium text-primaryFont-600 hover:underline">{isProcessing ? 'sending...' : 'Resend Code'}</a>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '30px' }}>
                <button
                  onClick={() => verify()}
                  className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
          :
          <CreatePass email={email} />
      }


    </>
  );
}
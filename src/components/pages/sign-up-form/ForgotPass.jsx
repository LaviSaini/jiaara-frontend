// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import './SignupForm.css';

export default function ForgotPass() {
    return (
        <>
        <div className="mt-12 flex items-center justify-center">
         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h1 className="text-2xl font-medium text-center mb-4">Forgot password?</h1>
    <form action="#" method="POST" className="space-y-7 forgot-pass-form" style={{marginTop: '20px', marginInline: '20px'}}>
       <InputField
                input={{
                  id: "Email Address",
                  className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                  required: true,
                  inputName: 'email'
                }}
                label={{
                  className: "text-sm font-normal text-gray-700",
                  text: "Email Address",
                  require: false
                }}
                validation={{
                  isEnabled: true,
                  messages: {
                    required: "Email Address is required."
                  }
                }}
              />
              <div class=" flex justify-center !mt-18 send-c-btn">
      <button
        type="submit"
        className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
      >
        Send Code
      </button>
      
      </div>
       <div className="flex justify-center" style={{marginTop: '130px', marginBottom: '30px'}}>
      <span className="text-sm text-gray-700">Remember Password? <a className="text-blue-700">Login</a></span>
      </div>
    </form>
  </div>
  </div>

        </>
    );
}
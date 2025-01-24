// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import './LogIn.css';

export default function LogIn() {
    return (
        <>
        <div className="mt-12 flex items-center justify-center">
         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h1 className="text-2xl font-medium text-center mb-4">Welcome</h1>
    <p className="text-center text-gray-600 text-sm mb-6 mx-8">
      LogIn to Your Account
    </p>
    <form action="#" method="POST" className="space-y-7 create-pass-form">
       <InputField
                       input={{
                         id: "Email Address",
                         className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
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
      
              <InputField
                input={{
                  id: "password",
                  className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                  required: true,
                  inputName: 'password'
                }}
                label={{
                  className: "text-sm font-normal text-gray-700",
                  text: "password",
                  require: false
                }}
                validation={{
                  isEnabled: true,
                  messages: {
                    required: "Password is required."
                  }
                }}
              />
              <div class=" flex justify-center !mt-28 !mb-10">
      <button
        type="submit"
        className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
      >
        Login
      </button>
      </div>
    </form>
    <div className="flex justify-center" style={{marginTop: '25px', marginBottom: '10px'}}>
      <span className="text-sm text-gray-700">Don't have an account <a className="text-blue-700">Sign Up</a></span>
      </div>
  </div>
  </div>

        </>
    );
}
// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import './SignupForm.css';

export default function CreatePass() {
    return (
        <>
        <div className="mt-12 flex items-center justify-center">
         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h1 className="text-2xl font-medium text-center mb-4">Create new password</h1>
    <p className="text-center text-gray-600 text-sm mb-6 mx-8">
      Your new password must be different from previously used password.
    </p>
    <form action="#" method="POST" className="space-y-7 create-pass-form">
       <InputField
                input={{
                  id: "new-password",
                  className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                  required: true,
                  inputName: 'newpassword'
                }}
                label={{
                  className: "text-sm font-normal text-gray-700",
                  text: "New password",
                  require: false
                }}
                validation={{
                  isEnabled: true,
                  messages: {
                    required: "First Name is required."
                  }
                }}
              />
      
              <InputField
                input={{
                  id: "confirm-password",
                  className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                  required: true,
                  inputName: 'confirmpassword'
                }}
                label={{
                  className: "text-sm font-normal text-gray-700",
                  text: "Confirm password",
                  require: false
                }}
                validation={{
                  isEnabled: true,
                  messages: {
                    required: "Last Name is required."
                  }
                }}
              />
              <div class=" flex justify-center !mt-28 !mb-10">
      <button
        type="submit"
        className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
      >
        Save
      </button>
      </div>
    </form>
  </div>
  </div>

        </>
    );
}
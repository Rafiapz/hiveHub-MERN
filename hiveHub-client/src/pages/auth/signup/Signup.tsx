
import SignupForm from "../../../components/signup/SignupForm";
import AuthBody from "../../../components/authBody/AuthBody";


function Signup() {
  
  return (
    <div className="flex w-full  overflow-auto">
      <AuthBody/>
      <SignupForm/>
    </div>
  );
}

export default Signup;

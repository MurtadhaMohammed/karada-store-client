import LoginForm from "./Form/loginForm";
import LoginFormWeb from "./FormWeb/loginFormWeb";

export default function Login() {
  return (
    <div className="pb-[100px] h-[100vh]">
      <div className="md:hidden block">
        <LoginForm />
      </div>
      <div className="md:block hidden">
        <LoginFormWeb />
      </div>
    </div>
  );
}

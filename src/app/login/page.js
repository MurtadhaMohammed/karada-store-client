import LoginForm from "./Form/loginForm";
import LoginFormWeb from "./FormWeb/loginFormWeb";

export default function Login() {
  return (
    <div className="pb-[100px] h-[100vh] overflow-hidden">
      <div className="md:hidden block h-full overflow-hidden">
        <LoginForm />
      </div>
      <div className="md:block hidden">
        <LoginFormWeb />
      </div>
    </div>
  );
}

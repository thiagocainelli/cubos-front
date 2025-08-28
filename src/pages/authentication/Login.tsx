import LayoutBase from "../../layout";
import LoginForm from "../../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <LayoutBase>
      <div className="flex items-center justify-center flex-1">
        <LoginForm />
      </div>
    </LayoutBase>
  );
};

export default LoginPage;

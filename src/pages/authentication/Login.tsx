import LayoutBase from "../../layout";
import LoginForm from "../../components/forms/LoginForm";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { getUserInfos, user } = useAuth();
  const navigate = useNavigate();

  const { "auth.token.cubos": token } = parseCookies();

  useEffect(() => {
    if (
      token &&
      token !== "" &&
      token !== undefined &&
      token !== null &&
      token !== "undefined" &&
      !user
    ) {
      getUserInfos();

      setTimeout(() => {
        navigate("/movies");
      }, 1500);
    } else if (user) {
      setTimeout(() => {
        navigate("/movies");
      }, 1500);
    }
  }, [token, user]);

  return (
    <LayoutBase>
      <div className="flex items-center justify-center flex-1">
        <LoginForm />
      </div>
    </LayoutBase>
  );
};

export default LoginPage;

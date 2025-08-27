import { useEffect, useState } from "react";
import { Form, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../../components/forms/authForms/ResetPasswordForm";
import { resetPassword } from "../../services/auth.service";
import queryString from "query-string";

const { Paragraph } = Typography;

const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const handleResetPassword = async () => {
    const dataToResetPassword = {
      newPassword: form.getFieldValue("password"),
      token: token ?? "",
    };

    try {
      setLoading(true);

      const reponse = await resetPassword(dataToResetPassword);

      if (reponse.success) {
        notification.success({
          message: "Password recovered successfully!",
          duration: 3,
          placement: "bottomRight",
        });

        navigate("/");
      } else {
        notification.error({
          message: `Failed to reset password. Try again.`,
          placement: "bottomRight",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const tokenParams = parsed.token as string | undefined;

    if (tokenParams) {
      setToken(tokenParams);
    }
  }, [token]);

  return (
    <main className="bg-white w-screen max-w-full md:h-screen md:max-h-screen flex md:flex-row flex-col">
      <section className="w-full md:w-[50%] h-screen md:h-auto flex flex-col items-center justify-center py-10 px-5 gap-10">
        <div className="flex flex-col items-center justify-center w-full">
          <Paragraph className="md:text-[40px] text-[32px] text-center">
            Reset Password
          </Paragraph>
          <Paragraph className="mt-[-20px] text-[16px] text-center">
            Email verification is done. Please choose another password!
          </Paragraph>
        </div>

        <ResetPasswordForm
          form={form}
          handleResetPassword={handleResetPassword}
          loading={loading}
        />
      </section>

      <section className="md:w-[50%] w-full">
        <img
          className="w-full h-full object-cover"
          src="../../../public/images/auth.png"
        />
      </section>
    </main>
  );
};

export default ResetPasswordPage;

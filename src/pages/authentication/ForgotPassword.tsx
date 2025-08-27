import { useState } from "react";
import { Form, Typography, notification } from "antd";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth.service";
import ForgotPasswordForm from "../../components/forms/authForms/ForgotPasswordForm";

const { Paragraph } = Typography;

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendEmail = async () => {
    try {
      setLoading(true);

      const dataToSendEmail = {
        email: form.getFieldValue("email"),
      };

      const response = await forgotPassword(dataToSendEmail);

      if (response.success) {
        notification.success({
          message:
            "Password recovery email sent successfully. Please check your email.",
          placement: "bottomRight",
          duration: 3,
        });

        navigate("/");
      } else {
        notification.error({
          message: `Failed to send recovery email. Please try again.`,
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

  return (
    <main className="bg-white w-screen max-w-full md:h-screen md:max-h-screen flex md:flex-row flex-col-reverse">
      <section className="md:w-[50%] w-full">
        <img
          className="w-full h-full object-cover"
          src="../../../public/images/auth.png"
        />
      </section>

      <section className="w-full md:w-[50%] h-screen md:h-auto flex flex-col items-center justify-center py-10 px-5 gap-10">
        <div className="flex flex-col items-center justify-center w-full">
          <Paragraph className="md:text-[40px] text-[32px] text-center">
            Forgot Password
          </Paragraph>
          <Paragraph className="mt-[-20px] text-[16px] text-center">
            We’ll e-mail you instructions on how to reset your password.
          </Paragraph>
        </div>

        <ForgotPasswordForm
          form={form}
          handleSendEmail={handleSendEmail}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default ForgotPasswordPage;

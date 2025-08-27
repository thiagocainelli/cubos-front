import { useState } from "react";
import { Form, Typography, notification } from "antd";

import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import RegisterForm from "../../components/forms/authForms/RegisterForm";

const { Paragraph } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const registerData = {
        name: form.getFieldValue("name"),
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      };

      const response = await register(registerData);

      if (response) {
        notification.success({
          message: "Account created successfully!",
          placement: "bottomRight",
          duration: 3,
        });

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      notification.error({
        message: "Failed to create account. Please try again.",
        placement: "bottomRight",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white w-screen max-w-full md:h-screen md:max-h-screen flex md:flex-row flex-col">
      <section className="w-full md:w-[50%] h-screen md:h-auto flex flex-col items-center justify-center py-10 px-5 gap-10">
        <div className="flex flex-col items-center justify-center w-full">
          <Paragraph className="md:text-[40px] text-[32px] text-center">
            {" "}
            Register your new account
          </Paragraph>
          <Paragraph className="mt-[-20px] text-[16px] text-center">
            Enter the information requested below to create your account.
          </Paragraph>
        </div>

        <RegisterForm
          form={form}
          handleRegister={handleRegister}
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

export default RegisterPage;

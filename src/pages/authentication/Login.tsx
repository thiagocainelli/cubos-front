import { useContext, useState } from 'react';
import { Form, Typography, notification } from 'antd';

import { AuthContext } from '../../contexts/AuthContext';
import LoginForm from '../../components/forms/authForms/LoginForm';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { signInByEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const email = form.getFieldValue('email');
      const password = form.getFieldValue('password');

      if (email && password) {
        setTimeout(() => {
          notification.success({
            placement: 'bottomRight',
            message: 'Login successful!',
          });
          navigate('/dashboard');
        }, 1000);
      }

      const response = await signInByEmail(email, password);

      if (response) {
        notification.success({
          placement: 'bottomRight',
          message: 'Login successful!',
        });

        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);

      notification.error({
        message: 'Login failed. Please check your credentials and try again.',
        placement: 'bottomRight',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-white w-screen max-w-full md:h-screen md:max-h-screen flex md:flex-row flex-col-reverse'>
      <section className='md:w-[50%] w-full'>
        <img className='w-full h-full object-cover' src='../../../public/images/auth.png' />
      </section>

      <section className='w-full md:w-[50%] h-screen md:h-auto flex flex-col items-center justify-center py-10 px-5 gap-10'>
        <div className='flex flex-col items-center w-full'>
          <Paragraph className='md:text-[40px] text-[32px] text-center'>
            Login to your Account
          </Paragraph>
          <Paragraph className='mt-[-20px] text-[16px] text-center'>
            Welcome back, select method to login.
          </Paragraph>
        </div>

        <LoginForm form={form} handleLogin={handleLogin} loading={loading} />
      </section>
    </main>
  );
};

export default LoginPage;

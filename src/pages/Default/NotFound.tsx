import { Button, Typography } from "antd";

const { Title } = Typography;

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <img
        className="md:w-1/2 w-full object-contain"
        src="../../../public/images/404.jpg"
      />
      <Title level={2} className="text-gray-600 mb-8 text-center">
        Sorry, the page you are looking for does not exist.
      </Title>
      <Button
        onClick={() => (window.location.href = "/login")}
        type="primary"
        size="large"
      >
        Go Home
      </Button>
    </main>
  );
};

export default NotFoundPage;
